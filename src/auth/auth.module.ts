import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';

import { Aluno } from '../entities/aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno]),
    PassportModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'segredo123',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy, // 🔥 AQUI É O QUE FALTAVA
  ],

  exports: [
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}