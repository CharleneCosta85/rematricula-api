import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,

    private jwtService: JwtService,
  ) {}

  // =====================================================
  // 🔐 LOGIN NORMAL (EMAIL + SENHA)
  // =====================================================
  async login(email: string, senha: string) {
    // 1. Busca o aluno pelo email
    const aluno = await this.alunoRepository.findOne({
      where: { email },
    });

    // 2. Verifica se o usuário existe
    if (!aluno) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // 3. Verifica se o usuário possui senha (evita erro com login Google)
    if (!aluno.senha) {
      throw new UnauthorizedException(
        'Usuário cadastrado via Google. Use login social.',
      );
    }

    // 4. Compara senha digitada com hash do banco
    const senhaValida = await bcrypt.compare(
      senha,
      aluno.senha,
    );

    if (!senhaValida) {
      throw new UnauthorizedException('Senha inválida');
    }

    // 5. Gera payload do JWT
    const payload = {
      sub: aluno.id,
      email: aluno.email,
    };

    // 6. Retorna token + dados básicos do usuário
    return {
      access_token: this.jwtService.sign(payload),
      aluno: {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
      },
    };
  }

  // =====================================================
  // 🌐 LOGIN GOOGLE OAUTH2
  // =====================================================
  async validateGoogleUser(user: {
    email: string;
    nome: string;
  }) {
    // 1. Verifica se o usuário já existe no banco
    let aluno = await this.alunoRepository.findOne({
      where: { email: user.email },
    });

    // 2. Se não existir, cria automaticamente
    if (!aluno) {
      aluno = this.alunoRepository.create({
        nome: user.nome,
        email: user.email,

        // matrícula gerada automaticamente para usuários Google
        matricula: `GOOGLE-${Date.now()}`,

        // IMPORTANTE: null indica que não usa senha
        senha: null,
      });

      await this.alunoRepository.save(aluno);
    }

    // 3. Gera payload JWT
    const payload = {
      sub: aluno.id,
      email: aluno.email,
    };

    // 4. Retorna token + dados do usuário
    return {
      access_token: this.jwtService.sign(payload),
      aluno: {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
      },
    };
  }
}