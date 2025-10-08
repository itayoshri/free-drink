import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { InvitationModule } from './invitation/invitation.module';
import { Invitation } from './invitation/invitation.entity';
import { Token } from './auth/auth.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        username: configService.get<string>('DATABASE_USER'),
        entities: [User, Invitation, Token],
        ssl: { rejectUnauthorized: false },
        database: configService.get<string>('DATABASE_NAME'),
        logging: true,
        synchronize: false,
      }),
    }),
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
