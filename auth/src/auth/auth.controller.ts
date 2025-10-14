import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { ApiResponse } from 'src/common/dto/response.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RolesGuard } from './rules.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async Login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse> {
    const {
      user,
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    } = await this.authService.validateUser(data.phoneNumber, data.password);

    this.authService.setAuthCookie(res, accessToken, expiresAccessToken);
    this.authService.setRefreshCookie(res, refreshToken, expiresRefreshToken);

    return {
      message: 'Logged in successfully',
      success: true,
      data: user,
    };
  }

  @Post('refresh')
  async getNewAccessToken(
    @Body() data: RefreshDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse> {
    try {
      const { token: accessToken, expiresToken: expiresAccessToken } =
        await this.authService.getNewAccessToken(data.refreshToken);

      this.authService.setAuthCookie(res, accessToken, expiresAccessToken);

      return {
        message: 'Refresh Access token successfully',
        success: true,
        data: {},
      };
    } catch {
      this.authService.clearAuthCookies(res);

      return {
        message: '',
        success: false,
        data: {},
      };
    }
  }

  @Roles(['premium_user', 'admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req: Record<string, string>) {
    return req.user;
  }
}
