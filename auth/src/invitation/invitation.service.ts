import { Injectable } from '@nestjs/common';
import { Invitation, UserRole } from './invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Role } from './roles.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async generateInvitation(role: UserRole, userId: string) {
    const token = crypto.randomBytes(16).toString('hex');
    const invitation = this.invitationRepository.create({
      token_value: token,
      role_key: role,
      created_by: userId,
      usage_limit: 1,
    });

    await this.invitationRepository.save(invitation);
    return { invitationToken: token, role };
  }

  async redeemInvitationToken(invitationToken: string): Promise<{
    invitationCode: string;
    role: UserRole;
  }> {
    const result = await this.invitationRepository
      .createQueryBuilder()
      .update()
      .set({ usage_count: () => 'usage_count + 1' })
      .where('token_value = :token AND usage_count < usage_limit', {
        token: invitationToken,
      })
      .returning(['token_value', 'role_key'])
      .execute();

    if (result.affected === 0) {
      throw new Error('Invitation not found or already used');
    }

    const updated = result.raw[0];
    return { invitationCode: updated.token_value, role: updated.role_key };
  }

  async getRolesMap(): Promise<Record<UserRole, string>> {
    const roles = await this.rolesRepository.find({
      select: ['role_key', 'display_name'],
    });

    return Object.fromEntries(
      roles.map((r) => [r.role_key, r.display_name]),
    ) as Record<UserRole, string>;
  }
}
