import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async CreateUser(@Body() data: CreateUserDto) {
    const { phoneNumber, password, invitationToken } = data;
    await this.usersService.createUser(phoneNumber, password, invitationToken);
  }

  @Get('exists')
  async checkUserExists(@Query('phoneNumber') phoneNumber: string) {
    const user = await this.usersService.exists(phoneNumber);
    return { exists: !!user };
  }
}
