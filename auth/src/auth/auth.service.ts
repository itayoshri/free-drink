import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from 'src/users/user.entity';
import { IsNull, Repository } from 'typeorm';
import { Token } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/invitation/invitation.entity';
import type { Response } from 'express';

type TokenType = 'refresh' | 'access';
interface JWTPayload {
  sub: string;
  phone_number: string;
  role: string;
  type?: TokenType;
}

const expiresTokenVars = {
  refresh: 'JWT_REFRESH_TOKEN_EXPIRATION_MS',
  access: 'JWT_ACCESS_TOKEN_EXPIRATION_MS',
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Token)
    private TokensRepository: Repository<Token>,
  ) {}

  generatePayload(user: User): JWTPayload {
    return {
      sub: user.user_id,
      phone_number: user.phone_number,
      role: user.role_key,
    };
  }

  async validateRefreshToken(refreshToken: string, userId: string) {
    const token = await this.TokensRepository.findOneBy({
      user_id: userId,
      revoked_at: IsNull(),
    });
    if (!token) return false;
    const expiresDate = token.expires_at;
    const isExpired = expiresDate <= new Date();
    const sha256 = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');
    const isValidToken = await bcrypt.compare(sha256, token.token_hash);

    return !isExpired && isValidToken;
  }

  setAuthCookie(res: Response, token: string, expires: Date) {
    res.cookie('Authentication', token, {
      httpOnly: true,
      secure: true,
      expires,
      sameSite: 'lax',
      path: '/',
    });

    res.cookie('access_token_expires', expires.toString(), {
      httpOnly: false,
      secure: true,
      expires,
      sameSite: 'lax',
      path: '/',
    });
  }

  setRefreshCookie(res: Response, token: string, expires: Date) {
    res.cookie('Refresh', token, {
      httpOnly: true,
      secure: true,
      expires,
      sameSite: 'strict',
      path: '/',
    });
  }

  clearAuthCookies(res: Response) {
    res.clearCookie('Authentication', {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie('Refresh', {
      httpOnly: true,
      secure: true,
    });
  }

  async getNewAccessToken(refreshToken: string, user?: User) {
    const { sub, phone_number, role } =
      await this.jwtService.verifyAsync<JWTPayload>(refreshToken);

    if (!(await this.validateRefreshToken(refreshToken, sub)))
      throw new HttpException(
        'Authorization token missing',
        HttpStatus.UNAUTHORIZED,
      );

    const payload = {
      sub,
      phone_number,
      role: user ? user.role_key : role,
    };
    return await this.generateToken(payload, 'access');
  }

  async pushRefreshToken(user: User, newToken: string, expiresDate: Date) {
    const sha256 = crypto.createHash('sha256').update(newToken).digest('hex');
    const hashedToken = await bcrypt.hash(sha256, 10);

    // revoke old refresh tokens
    await this.TokensRepository.createQueryBuilder()
      .update()
      .set({ revoked_at: new Date() })
      .where('user_id = :userId', {
        userId: user.user_id,
      })
      .andWhere('revoked_at IS NULL')
      .execute();

    await this.TokensRepository.createQueryBuilder()
      .insert()
      .into(Token)
      .values({
        user_id: user.user_id,
        token_hash: hashedToken,
        expires_at: expiresDate,
      })
      .execute();
  }

  async generateToken(payload: JWTPayload, type: TokenType, user?: User) {
    const expiration = parseInt(
      this.configService.getOrThrow(expiresTokenVars[type]),
    );
    const expiresToken = new Date(Date.now() + expiration);
    const token = await this.jwtService.signAsync(
      { ...payload, type },
      {
        expiresIn: expiration,
      },
    );

    if (type === 'refresh' && user) {
      await this.pushRefreshToken(user, token, expiresToken);
    }

    return { token, expiresToken };
  }

  async generateTokens(user: User) {
    const payload = this.generatePayload(user);

    const { token: accessToken, expiresToken: expiresAccessToken } =
      await this.generateToken(payload, 'access');
    const { token: refreshToken, expiresToken: expiresRefreshToken } =
      await this.generateToken(payload, 'refresh', user);

    return {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    };
  }

  async validateUser(
    phoneNumber: string,
    password: string,
  ): Promise<{
    user: Partial<User>;
    accessToken: string;
    refreshToken: string;
    expiresAccessToken: Date;
    expiresRefreshToken: Date;
  }> {
    const user = await this.usersService.findOne(phoneNumber);

    if (!user) {
      throw new HttpException("User doesn't exists", HttpStatus.NOT_FOUND);
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!isCorrectPassword) {
      throw new HttpException(
        'Incorrect phone number or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = this.generatePayload(user);

    const {
      accessToken,
      expiresAccessToken,
      refreshToken,
      expiresRefreshToken,
    } = await this.generateTokens(user);
    await this.generateToken(payload, 'access');

    const { password_hash, ...noPassUser } = user;

    return {
      user: noPassUser,
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    };
  }

  matchRoles(roles: Role[], userRole: Role) {
    return roles.includes(userRole);
  }
}
