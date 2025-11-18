import { IsString } from 'class-validator';

export class RedeemInvitationDto {
  @IsString()
  invitationToken: string;
}
