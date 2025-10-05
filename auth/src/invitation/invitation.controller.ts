import { Body, Controller, Post, Request } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { GenerateInvitationDto } from './dto/generate-invitation.dto';
import { Role } from './invitation.entity';
import { RedeemInvitationDto } from './dto/redeem-invitation.dto';
import { UsersService } from 'src/users/users.service';

@Controller('invitation')
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('generate')
  async generateToken(@Body() data: GenerateInvitationDto) {
    const { role, userId } = data;
    await this.invitationService.generateInvitation(role as Role, userId);
  }

  @Post('redeem')
  async redeemToken(@Body() data: RedeemInvitationDto) {
    const { invitationToken, userId } = data;
    const { role } =
      await this.invitationService.redeemInvitationToken(invitationToken);

    await this.usersService.EditCreatedToken(userId, invitationToken, role);
  }
}
