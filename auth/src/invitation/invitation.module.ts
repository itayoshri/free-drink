import { forwardRef, Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { Invitation } from './invitation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationController } from './invitation.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Invitation]),
  ],
  providers: [InvitationService],
  exports: [InvitationService],
  controllers: [InvitationController],
})
export class InvitationModule {}
