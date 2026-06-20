import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Disciplina } from './disciplina.entity';
import { Aluno } from './aluno.entity';

@Entity()
export class Curso {

  // Chave primária gerada automaticamente
  @PrimaryGeneratedColumn()
  id: number;

  // Nome do curso
  @Column()
  nome: string;

  // Sigla do curso (ADS, SI, etc.)
  @Column()
  sigla: string;

  // Um curso possui várias disciplinas
  @OneToMany(
    () => Disciplina,
    disciplina => disciplina.curso,
  )
  disciplinas: Disciplina[];

  // Um curso possui vários alunos
  @OneToMany(
    () => Aluno,
    aluno => aluno.curso,
  )
  alunos: Aluno[];
}