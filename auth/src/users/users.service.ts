import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/invitation/invitation.entity';
import { InvitationService } from 'src/invitation/invitation.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private invitationService: InvitationService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(phoneNumber: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ phone_number: phoneNumber });
  }

  async createUser(
    phone_number: string,
    password: string,
    invitation_token?: string,
  ) {
    const password_hash = await bcrypt.hash(password, 12);
    let role: Role = 'guest';
    if (invitation_token)
      role = (
        await this.invitationService.redeemInvitationToken(invitation_token)
      ).role;

    const user = this.usersRepository.create({
      phone_number,
      password_hash,
      role_key: role,
      created_token: invitation_token,
    });

    await this.usersRepository.save(user);
  }

  async EditUserRole(id: string, tokenValue: string, role: Role) {
    const result = await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ created_token: tokenValue, role_key: role })
      .where('user_id = :id', { id })
      .returning('*')
      .execute();

    if (!result.raw || result.raw.length === 0) {
      throw new Error('User was not found');
    }

    return result.raw[0] as User;
  }
}
