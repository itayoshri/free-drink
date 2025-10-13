import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { GenerateInvitationDto } from './dto/generate-invitation.dto';
import { Role } from './invitation.entity';
import { RedeemInvitationDto } from './dto/redeem-invitation.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/rules.guard';

@Controller('invitation')
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly usersService: UsersService,
  ) {}

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Post('generate')
  async generateToken(
    @Req() request: Request,
    @Body() data: GenerateInvitationDto,
  ) {
    const { role } = data;
    return await this.invitationService.generateInvitation(
      role as Role,
      request['user'].sub,
    );
  }

  @UseGuards(AuthGuard)
  @Post('redeem')
  async redeemToken(
    @Req() request: Request,
    @Body() data: RedeemInvitationDto,
  ) {
    const { invitationToken } = data;
    const { role } =
      await this.invitationService.redeemInvitationToken(invitationToken);

    await this.usersService.EditUserRole(
      request['user'].sub,
      invitationToken,
      role,
    );
  }
}
