import { IsString } from 'class-validator';

export class RedeemInvitationDto {
  @IsString()
  userId: string;

  @IsString()
  invitationToken: string;
}
