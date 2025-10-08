import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Token } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  async PushRefreshToken(user: User, newToken: string, expiresDate: Date) {
    //TODO: hash tokens
    const hashedToken = newToken;

    // revoke old refresh tokens
    await this.TokensRepository.createQueryBuilder()
      .update()
      .set({ revoked_at: new Date() })
      .where('user_id = :userId', {
        userId: user.user_id,
      })
      .execute();

    const token = this.TokensRepository.create({
      user_id: user.user_id,
      token_hash: hashedToken,
      expires_at: expiresDate,
    });
    await this.TokensRepository.save(token);
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
      await this.PushRefreshToken(user, token, expiresToken);
    }

    return { token, expiresToken };
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
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const payload = this.generatePayload(user);

    const { token: accessToken, expiresToken: expiresAccessToken } =
      await this.generateToken(payload, 'access');
    const { token: refreshToken, expiresToken: expiresRefreshToken } =
      await this.generateToken(payload, 'refresh', user);

    const { password_hash, ...noPassUser } = user;

    return {
      user: noPassUser,
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    };
  }
}
