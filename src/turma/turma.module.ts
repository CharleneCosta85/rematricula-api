import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Turma } from '../entities/turma.entity';
import { Disciplina } from '../entities/disciplina.entity';

import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Turma,
      Disciplina, // 🔥 ESSENCIAL (isso faltava)
    ]),
  ],
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}
