import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Curso } from './curso.entity';
import { Matricula } from './matricula.entity';

@Entity()
export class Aluno {

  // ID do aluno
  @PrimaryGeneratedColumn()
  id: number;

  // Nome completo
  @Column()
  nome: string;

  // Matrícula única
  @Column({ unique: true })
  matricula: string;

  // E-mail único
  @Column({ unique: true })
  email: string;

  // 🔐 SENHA (CORRETO PARA POSTGRES + GOOGLE LOGIN)
  @Column({ type: 'varchar', nullable: true })
  senha: string | null;

  // Muitos alunos pertencem a um curso
  @ManyToOne(
    () => Curso,
    curso => curso.alunos,
  )
  curso: Curso;

  // Um aluno possui várias matrículas
  @OneToMany(
    () => Matricula,
    matricula => matricula.aluno,
  )
  matriculas: Matricula[];
}