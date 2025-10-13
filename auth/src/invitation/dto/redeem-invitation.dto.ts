import { IsString } from 'class-validator';

export class RedeemInvitationDto {
  @IsString()
  invitationToken: string;

  @IsString()
  refreshToken: string;
}
