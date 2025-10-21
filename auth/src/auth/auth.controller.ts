import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Res,
  Req,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { ApiResponse } from 'src/common/dto/response.dto';
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
      data: { user },
    };
  }

  @Get('refresh')
  async getNewAccessToken(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse> {
    const refreshToken = this.authService.extractTokenFromHeader(
      request,
      'refresh_token',
    );

    try {
      const { token: accessToken, expiresToken: expiresAccessToken } =
        await this.authService.getNewAccessToken(refreshToken as string);

      this.authService.setAuthCookie(res, accessToken, expiresAccessToken);

      return {
        message: 'Refresh Access token successfully',
        success: true,
        data: {},
      };
    } catch {
      this.authService.clearAuthCookies(res);
      throw new HttpException('', HttpStatus.UNAUTHORIZED);

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
  getProfile(@Req() req: Record<string, string>) {
    return req.user;
  }
}
