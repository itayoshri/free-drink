import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    readonly authService: AuthService,
  ) {}

  @Post('create')
  async CreateUser(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { phoneNumber, password, invitationToken } = data;
    const user = await this.usersService.createUser(
      phoneNumber,
      password,
      invitationToken,
    );

    const {
      accessToken,
      expiresAccessToken,
      refreshToken,
      expiresRefreshToken,
    } = await this.authService.generateTokens(user);

    this.authService.setAuthCookie(res, accessToken, expiresAccessToken);
    this.authService.setRefreshCookie(res, refreshToken, expiresRefreshToken);

    return {
      message: 'user has been created',
      success: true,
      data: { user },
    };
  }

  @Get('exists')
  async checkUserExists(@Query('phoneNumber') phoneNumber: string) {
    const user = await this.usersService.exists(phoneNumber);
    return { exists: !!user };
  }
}
