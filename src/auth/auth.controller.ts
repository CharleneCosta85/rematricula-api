import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import type { Request } from 'express';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ======================================
  // 🔐 LOGIN NORMAL
  // ======================================
  @Post('login')
  @ApiOperation({ summary: 'Realiza login do aluno' })
  @ApiBody({
    schema: {
      example: {
        email: 'maria@email.com',
        senha: '123456',
      },
    },
  })
  login(
    @Body('email') email: string,
    @Body('senha') senha: string,
  ) {
    return this.authService.login(email, senha);
  }

  // ======================================
  // 🌐 GOOGLE LOGIN
  // ======================================
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // redireciona para o Google
  }

  // ======================================
  // 🌐 GOOGLE CALLBACK
  // ======================================
  // 
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req) {
  if (!req.user) {
    throw new Error('Google não retornou usuário');
  }

  return this.authService.validateGoogleUser(req.user);
}
}