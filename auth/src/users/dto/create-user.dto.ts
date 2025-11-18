import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  phoneNumber: string;

  @IsString()
  password: string;

  @IsString()
  invitationToken?: string;
}
