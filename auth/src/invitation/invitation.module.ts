import { forwardRef, Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { Invitation } from './invitation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationController } from './invitation.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from './roles.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Invitation]),
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [InvitationService],
  exports: [InvitationService],
  controllers: [InvitationController],
})
export class InvitationModule {}
