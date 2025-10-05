import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(phone_number: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ phone_number });
  }

  async createUser(
    phone_number: string,
    role_key: string,
    invitation_token?: string,
  ) {
    const password_hash = await bcrypt.hash('', 12);

    const user = this.usersRepository.create({
      phone_number,
      role_key,
      password_hash,
      created_token_id: invitation_token,
    });

    await this.usersRepository.save(user);
  }
}
