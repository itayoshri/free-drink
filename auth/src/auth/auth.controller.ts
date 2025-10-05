import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  Login(@Body() data: LoginDto) {
    return this.authService.signIn(data.phoneNumber, data.password);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Record<string, string>) {
    return req.user;
  }
}
