import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

type TokenType = 'refresh' | 'access';
interface JWTPayload {
  sub: string;
  phone_number: string;
  role: string;
  type?: TokenType;
}

const expiresTokenVars = {
  refresh: 'JWT_REFRESH_TOKEN_EXPIRATION',
  access: 'JWT_ACCESS_TOKEN_EXPIRATION',
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generatePayload(user: User): JWTPayload {
    return {
      sub: user.user_id,
      phone_number: user.phone_number,
      role: user.role_key,
    };
  }

  async generateToken(payload: JWTPayload, type: TokenType) {
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

    return { token, expiresToken };
  }

  async generateTokens(user: User) {
    const payload = this.generatePayload(user);

    const { token: accessToken, expiresToken: expiresAccessToken } =
      await this.generateToken(payload, 'access');
    const { token: refreshToken, expiresToken: expiresRefreshToken } =
      await this.generateToken(payload, 'refresh');

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
    user;
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

    const {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    } = await this.generateTokens(user);

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
