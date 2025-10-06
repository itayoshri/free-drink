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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async Login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<{ token: string }>> {
    const {
      user,
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    } = await this.authService.validateUser(data.phoneNumber, data.password);

    res.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: true,
      expires: expiresAccessToken,
    });

    res.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: expiresRefreshToken,
    });

    return {
      message: 'Logged in successfully',
      success: true,
      data: user,
    };
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Record<string, string>) {
    return req.user;
  }
}
