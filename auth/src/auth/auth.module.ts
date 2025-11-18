import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Token } from './auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ensures .env is loaded
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        privateKey: configService.get<string>('PRIVATE_KEY'),
        publicKey: configService.get<string>('PUBLIC_KEY'),
        signOptions: { expiresIn: '1h', algorithm: 'RS256' },
        verifyOptions: { algorithms: ['RS256'] },
      }),
    }),
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
