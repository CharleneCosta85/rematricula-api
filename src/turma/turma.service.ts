import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Turma } from '../entities/turma.entity';
import { Disciplina } from '../entities/disciplina.entity';

import { CreateTurmaDto } from './dto/create-turma.dto';

@Injectable()
export class TurmaService {
  /*
   * Injeta os repositórios do TypeORM.
   *
   * Turma:
   * responsável pelas operações da tabela turma.
   *
   * Disciplina:
   * utilizada para validar se a disciplina existe.
   */
  constructor(
    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>,

    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  /*
   * CREATE
   *
   * Cadastra uma nova turma.
   */
  async create(dto: CreateTurmaDto) {
    /*
     * Verifica se a disciplina existe.
     */
    const disciplina =
      await this.disciplinaRepository.findOneBy({
        id: dto.disciplinaId,
      });

    /*
     * Caso não exista,
     * retorna erro 404.
     */
    if (!disciplina) {
      throw new NotFoundException(
        'Disciplina não encontrada',
      );
    }

    /*
     * Cria a turma em memória.
     */
    const turma =
      this.turmaRepository.create({
        professor: dto.professor,
        horario: dto.horario,
        periodoLetivo: dto.periodoLetivo,
        disciplina,
      });

    /*
     * Salva no banco.
     */
    return this.turmaRepository.save(turma);
  }

  /*
   * READ
   *
   * Lista todas as turmas.
   */
  findAll() {
    return this.turmaRepository.find({
      /*
       * Retorna também os dados da disciplina.
       */
      relations: {
        disciplina: true,
      },
    });
  }

  /*
   * READ BY ID
   *
   * Busca uma turma específica.
   */
  async findOne(id: number) {
    const turma =
      await this.turmaRepository.findOne({
        where: {
          id,
        },

        relations: {
          disciplina: true,
        },
      });

    /*
     * Caso não encontre,
     * retorna erro 404.
     */
    if (!turma) {
      throw new NotFoundException(
        'Turma não encontrada',
      );
    }

    return turma;
  }

  /*
   * UPDATE
   *
   * Atualiza os dados da turma.
   */
  async update(
    id: number,
    dto: CreateTurmaDto,
  ) {
    /*
     * Verifica se a turma existe.
     */
    const turma =
      await this.findOne(id);

    /*
     * Verifica se a disciplina existe.
     */
    const disciplina =
      await this.disciplinaRepository.findOneBy({
        id: dto.disciplinaId,
      });

    if (!disciplina) {
      throw new NotFoundException(
        'Disciplina não encontrada',
      );
    }

    /*
     * Atualiza os campos.
     */
    turma.professor =
      dto.professor;

    turma.horario =
      dto.horario;

    turma.periodoLetivo =
      dto.periodoLetivo;

    turma.disciplina =
      disciplina;

    /*
     * Salva as alterações.
     */
    return this.turmaRepository.save(turma);
  }

  /*
   * DELETE
   *
   * Remove uma turma.
   */
  async remove(id: number) {
    /*
     * Verifica se a turma existe.
     */
    const turma =
      await this.findOne(id);

    /*
     * Remove do banco.
     */
    await this.turmaRepository.remove(
      turma,
    );

    /*
     * Retorna mensagem de sucesso.
     */
    return {
      mensagem:
        'Turma removida com sucesso',
    };
  }

  /*
   * LISTAGEM POR PERÍODO
   *
   * Retorna todas as turmas
   * de um determinado período letivo.
   */
  findByPeriodo(periodo: string) {
    return this.turmaRepository.find({
      where: {
        periodoLetivo: periodo,
      },

      relations: {
        disciplina: true,
      },
    });
  }
}