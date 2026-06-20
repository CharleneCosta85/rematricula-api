import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Disciplina } from './disciplina.entity';

@Entity()
export class PreRequisito {

  /*
   * Identificador do pré-requisito.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Disciplina que possui o pré-requisito.
   *
   * Exemplo:
   * Algoritmos II
   */
  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: 'disciplina_id' })
  disciplina: Disciplina;

  /*
   * Disciplina exigida anteriormente.
   *
   * Exemplo:
   * Algoritmos I
   */
  @ManyToOne(() => Disciplina)
  @JoinColumn({
    name: 'disciplina_requisito_id',
  })
  disciplinaRequisito: Disciplina;
}