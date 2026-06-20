import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Curso } from '../entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  create(dto: CreateCursoDto) {
    const curso = this.cursoRepository.create(dto);
    return this.cursoRepository.save(curso);
  }

  findAll() {
    return this.cursoRepository.find();
  }

  findOne(id: number) {
    return this.cursoRepository.findOneBy({ id });
  }

  async update(id: number, dto: CreateCursoDto) {
    await this.cursoRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.cursoRepository.delete(id);
    return { mensagem: 'Curso removido com sucesso' };
  }
}
