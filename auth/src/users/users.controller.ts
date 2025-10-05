import { Body, Controller, Post } from '@nestjs/common';
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
}
