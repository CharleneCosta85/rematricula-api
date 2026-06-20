import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Curso } from './curso.entity';
import { Turma } from './turma.entity';

@Entity()
export class Disciplina {

  @PrimaryGeneratedColumn()
  id: number;

  // Código da disciplina
  @Column()
  codigo: string;

  // Nome
  @Column()
  nome: string;

  // Carga horária
  @Column()
  cargaHoraria: number;

  // Muitas disciplinas pertencem a um curso
  @ManyToOne(
    () => Curso,
    curso => curso.disciplinas,
  )
  curso: Curso;

  // Uma disciplina pode ter várias turmas
  @OneToMany(
    () => Turma,
    turma => turma.disciplina,
  )
  turmas: Turma[];
}