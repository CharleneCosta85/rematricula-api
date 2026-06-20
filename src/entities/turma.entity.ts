import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Disciplina } from './disciplina.entity';
import { Matricula } from './matricula.entity';

@Entity()
export class Turma {

  @PrimaryGeneratedColumn()
  id: number;

  // Nome do professor
  @Column()
  professor: string;

  // Exemplo: Segunda 19h às 22h
  @Column()
  horario: string;

  // Exemplo: 2026.1
  @Column()
  periodoLetivo: string;

  // Muitas turmas pertencem a uma disciplina
  @ManyToOne(
    () => Disciplina,
    disciplina => disciplina.turmas,
  )
  disciplina: Disciplina;

  // Uma turma possui várias matrículas
  @OneToMany(
    () => Matricula,
    matricula => matricula.turma,
  )
  matriculas: Matricula[];
}