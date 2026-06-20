import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Aluno } from './aluno.entity';
import { Turma } from './turma.entity';

@Entity()
export class Matricula {

  @PrimaryGeneratedColumn()
  id: number;

  // Aluno matriculado
  @ManyToOne(
    () => Aluno,
    aluno => aluno.matriculas,
  )
  aluno: Aluno;

  // Turma escolhida
  @ManyToOne(
    () => Turma,
    turma => turma.matriculas,
  )
  turma: Turma;

  // Situação inicial da matrícula
  @Column({
    default: 'ATIVA',
  })
  situacao: string;

  // Data automática da matrícula
  @CreateDateColumn()
  dataMatricula: Date;
}