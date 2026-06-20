import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Disciplina } from '../entities/disciplina.entity';
import { Curso } from '../entities/curso.entity';

import { CreateDisciplinaDto } from './dto/create-disciplina.dto';

@Injectable()
export class DisciplinaService {
  /*
   * Injeta os repositórios do TypeORM.
   *
   * Disciplina:
   * responsável pelas operações da tabela disciplina.
   *
   * Curso:
   * utilizado para validar se o curso informado existe.
   */
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,

    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  /*
   * CREATE
   *
   * Cadastra uma nova disciplina.
   */
  async create(dto: CreateDisciplinaDto) {
    /*
     * Verifica se o curso informado existe.
     */
    const curso = await this.cursoRepository.findOneBy({
      id: dto.cursoId,
    });

    /*
     * Caso o curso não exista,
     * retorna erro 404.
     */
    if (!curso) {
      throw new NotFoundException(
        'Curso não encontrado',
      );
    }

    /*
     * Cria a disciplina em memória.
     */
    const disciplina =
      this.disciplinaRepository.create({
        codigo: dto.codigo,
        nome: dto.nome,
        cargaHoraria: dto.cargaHoraria,
        curso,
      });

    /*
     * Salva no banco de dados.
     */
    return this.disciplinaRepository.save(
      disciplina,
    );
  }

  /*
   * READ
   *
   * Lista todas as disciplinas.
   */
  findAll() {
    return this.disciplinaRepository.find({
      /*
       * Retorna também os dados do curso.
       *
       * Sintaxe correta do TypeORM 0.3+
       */
      relations: {
        curso: true,
      },
    });
  }

  /*
   * READ BY ID
   *
   * Busca uma disciplina específica.
   */
  async findOne(id: number) {
    const disciplina =
      await this.disciplinaRepository.findOne({
        where: {
          id,
        },

        /*
         * Retorna o curso relacionado.
         */
        relations: {
          curso: true,
        },
      });

    /*
     * Caso não encontre,
     * retorna erro 404.
     */
    if (!disciplina) {
      throw new NotFoundException(
        'Disciplina não encontrada',
      );
    }

    return disciplina;
  }

  /*
   * UPDATE
   *
   * Atualiza os dados da disciplina.
   */
  async update(
    id: number,
    dto: CreateDisciplinaDto,
  ) {
    /*
     * Verifica se a disciplina existe.
     */
    const disciplina =
      await this.findOne(id);

    /*
     * Verifica se o curso existe.
     */
    const curso =
      await this.cursoRepository.findOneBy({
        id: dto.cursoId,
      });

    if (!curso) {
      throw new NotFoundException(
        'Curso não encontrado',
      );
    }

    /*
     * Atualiza os campos.
     */
    disciplina.codigo =
      dto.codigo;

    disciplina.nome =
      dto.nome;

    disciplina.cargaHoraria =
      dto.cargaHoraria;

    disciplina.curso =
      curso;

    /*
     * Salva as alterações.
     */
    return this.disciplinaRepository.save(
      disciplina,
    );
  }

  /*
   * DELETE
   *
   * Remove uma disciplina.
   */
  async remove(id: number) {
    /*
     * Verifica se a disciplina existe.
     */
    const disciplina =
      await this.findOne(id);

    /*
     * Remove do banco.
     */
    await this.disciplinaRepository.remove(
      disciplina,
    );

    /*
     * Retorna mensagem de sucesso.
     */
    return {
      mensagem:
        'Disciplina removida com sucesso',
    };
  }
}