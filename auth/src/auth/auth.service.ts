import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (user?.password_hash !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.user_id, phone_number: user.phone_number };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
