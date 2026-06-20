import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Aluno } from '../entities/aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async create(dto: CreateAlunoDto) {
    const senhaHash = await bcrypt.hash(dto.senha, 10);

    const aluno = this.alunoRepository.create({
      nome: dto.nome,
      matricula: dto.matricula,
      email: dto.email,
      senha: senhaHash,
      curso: {
        id: dto.cursoId,
      } as any,
    });

    return this.alunoRepository.save(aluno);
  }

  findAll() {
    return this.alunoRepository.find();
  }

  findOne(id: number) {
    return this.alunoRepository.findOne({
      where: { id },
    });
  }

  // ✅ AQUI ESTÁ O FIX (dentro da classe)
  async update(id: number, dto: UpdateAlunoDto) {
    const aluno = await this.alunoRepository.findOneBy({ id });

    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    if (dto.senha) {
      dto.senha = await bcrypt.hash(dto.senha, 10);
    }

    await this.alunoRepository.update(id, dto);

    return this.alunoRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.alunoRepository.delete(id);
  }
}