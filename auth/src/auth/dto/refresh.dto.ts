import { IsObject, IsString } from 'class-validator';
import { User } from 'src/users/user.entity';

export class RefreshDto {
  @IsObject()
  user: User;

  @IsString()
  refreshToken: string;
}
