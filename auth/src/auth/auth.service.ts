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

  async signIn(
    phoneNumber: string,
    password: string,
  ): Promise<{ access_token: string }> {
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

    const payload = {
      sub: user.user_id,
      phone_number: user.phone_number,
      role: user.role_key,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
