import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { GenerateInvitationDto } from './dto/generate-invitation.dto';
import { UserRole } from './invitation.entity';
import { RedeemInvitationDto } from './dto/redeem-invitation.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/rules.guard';
import { AuthService } from 'src/auth/auth.service';
import type { Response, Request } from 'express';
import { Public } from 'src/auth/public.decorator';

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
      role as UserRole,
      request['user'].sub as string,
    );
  }

  @Post('redeem')
  async redeemToken(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() data: RedeemInvitationDto,
  ) {
    const { invitationToken } = data;
    const refreshToken = this.authService.extractTokenFromHeader(
      request,
      'refresh_token',
    ) as string;

    if (
      !(await this.authService.validateRefreshToken(
        refreshToken,
        request['user'].sub as string,
      ))
    ) {
      this.authService.clearAuthCookies(res);
      throw new HttpException(
        'Refresh token is invalid or has expired',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const { role } =
        await this.invitationService.redeemInvitationToken(invitationToken);

      const updatedUser = await this.usersService.EditUserRole(
        request['user'].sub as string,
        invitationToken,
        role,
      );

      const {
        accessToken,
        expiresAccessToken,
        refreshToken: newRefreshToken,
        expiresRefreshToken,
      } = await this.authService.generateTokens(updatedUser);

      this.authService.setAuthCookie(res, accessToken, expiresAccessToken);
      this.authService.setRefreshCookie(
        res,
        newRefreshToken,
        expiresRefreshToken,
      );

      return {
        message:
          'Invitation token successfully redeemed and the corresponding role has been applied to the user',
        success: true,
        data: {
          role,
        },
      };
    } catch (error) {
      throw new HttpException(error.message as string, HttpStatus.NOT_FOUND);
    }
  }

  @Public()
  @Get('roles')
  async getRoles() {
    return await this.invitationService.getRolesMap();
  }
}
