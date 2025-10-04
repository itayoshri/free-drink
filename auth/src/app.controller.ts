import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get('test')
  async test() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Record<string, string>) {
    return req.user;
  }
}
