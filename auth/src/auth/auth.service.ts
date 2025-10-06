import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generatePayload(user) {
    return {
      sub: user.user_id,
      phone_number: user.phone_number,
      role: user.role_key,
    };
  }

  async generateAccessToken(payload) {
    const expirationMs = parseInt(
      this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS'),
    );
    const expiresAccessToken = new Date(Date.now() + expirationMs);

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: expirationMs,
    });

    return { accessToken, expiresAccessToken };
  }

  async generateRefreshToken(payload) {
    const refreshExpirationMs = parseInt(
      this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS'),
    );

    const expiresRefreshToken = new Date(Date.now() + refreshExpirationMs);

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: refreshExpirationMs,
    });

    return { refreshToken, expiresRefreshToken };
  }

  async generateTokens(user) {
    const payload = this.generatePayload(user);

    const { accessToken, expiresAccessToken } =
      await this.generateAccessToken(payload);
    const { refreshToken, expiresRefreshToken } =
      await this.generateRefreshToken(payload);

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
