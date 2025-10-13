import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { GenerateInvitationDto } from './dto/generate-invitation.dto';
import { Role } from './invitation.entity';
import { RedeemInvitationDto } from './dto/redeem-invitation.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/rules.guard';
import { AuthService } from 'src/auth/auth.service';
import type { Response } from 'express';

@Controller('invitation')
@UseGuards(AuthGuard)
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Post('generate')
  async generateToken(
    @Req() request: Request,
    @Body() data: GenerateInvitationDto,
  ) {
    const { role } = data;
    return await this.invitationService.generateInvitation(
      role as Role,
      request['user'].sub as string,
    );
  }

  @Post('redeem')
  async redeemToken(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() data: RedeemInvitationDto,
  ) {
    const { invitationToken, refreshToken } = data;
    try {
      const { role } =
        await this.invitationService.redeemInvitationToken(invitationToken);

      const updatedUser = await this.usersService.EditUserRole(
        request['user'].sub as string,
        invitationToken,
        role,
      );

      try {
        const { token: accessToken, expiresToken: expiresAccessToken } =
          await this.authService.getNewAccessToken(refreshToken, updatedUser);

        this.authService.setAuthCookie(res, accessToken, expiresAccessToken);

        return {
          message:
            'Invitation token successfully redeemed and the corresponding role has been applied to the user',
          success: true,
          data: {
            role,
          },
        };
      } catch {
        this.authService.clearAuthCookies(res);

        return {
          message: '',
          success: false,
          data: {},
        };
      }
    } catch (error) {
      return {
        message: error,
        success: false,
        data: {},
      };
    }
  }
}
