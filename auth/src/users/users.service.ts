import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/invitation/invitation.entity';
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

  exists(phoneNumber: string): Promise<boolean> {
    return this.usersRepository.exists({
      where: { phone_number: phoneNumber },
    });
  }

  async createUser(
    phone_number: string,
    password: string,
    invitation_token?: string,
  ) {
    if (await this.exists(phone_number))
      throw new HttpException('User already exsists', HttpStatus.CONFLICT);

    let role: UserRole = 'guest';
    if (invitation_token)
      try {
        role = (
          await this.invitationService.redeemInvitationToken(invitation_token)
        ).role;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

    const password_hash = await bcrypt.hash(password, 12);
    const user = this.usersRepository.create({
      phone_number,
      password_hash,
      role_key: role,
      created_token: invitation_token,
    });

    await this.usersRepository.save(user);
    return user;
  }

  async EditUserRole(id: string, tokenValue: string, role: UserRole) {
    const result = await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ created_token: tokenValue, role_key: role })
      .where('user_id = :id', { id })
      .returning('*')
      .execute();

    if (!result.raw || result.raw.length === 0) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    return result.raw[0] as User;
  }
}
