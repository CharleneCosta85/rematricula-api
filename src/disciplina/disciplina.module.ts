import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DisciplinaController } from './disciplina.controller';
import { DisciplinaService } from './disciplina.service';

import { Disciplina } from '../entities/disciplina.entity';
import { Curso } from '../entities/curso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Disciplina,
      Curso,
    ]),
  ],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
})
export class DisciplinaModule {}