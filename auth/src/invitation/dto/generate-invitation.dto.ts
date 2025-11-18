import { IsString } from 'class-validator';

export class GenerateInvitationDto {
  @IsString()
  role: string;
}
