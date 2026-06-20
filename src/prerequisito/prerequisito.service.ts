import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PreRequisito } from '../entities/prerequisito.entity';
import { Disciplina } from '../entities/disciplina.entity';

import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';

@Injectable()
export class PrerequisitoService {

  constructor(
    @InjectRepository(PreRequisito)
    private prerequisitoRepository: Repository<PreRequisito>,

    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  /*
   * Cadastra um novo pré-requisito.
   */
  async create(dto: CreatePrerequisitoDto) {

    const disciplina =
      await this.disciplinaRepository.findOneBy({
        id: dto.disciplinaId,
      });

    if (!disciplina) {
      throw new NotFoundException(
        'Disciplina não encontrada',
      );
    }

    const disciplinaRequisito =
      await this.disciplinaRepository.findOneBy({
        id: dto.disciplinaRequisitoId,
      });

    if (!disciplinaRequisito) {
      throw new NotFoundException(
        'Disciplina requisito não encontrada',
      );
    }

    const prerequisito =
      this.prerequisitoRepository.create({
        disciplina,
        disciplinaRequisito,
      });

    return this.prerequisitoRepository.save(
      prerequisito,
    );
  }

  /*
   * Lista todos os pré-requisitos.
   */
  findAll() {
    return this.prerequisitoRepository.find({
      relations: {
        disciplina: true,
        disciplinaRequisito: true,
      },
    });
  }

  /*
   * Busca um pré-requisito pelo ID.
   */
  async findOne(id: number) {

    const prerequisito =
      await this.prerequisitoRepository.findOne({
        where: { id },
        relations: {
          disciplina: true,
          disciplinaRequisito: true,
        },
      });

    if (!prerequisito) {
      throw new NotFoundException(
        'Pré-requisito não encontrado',
      );
    }

    return prerequisito;
  }

  /*
   * Remove um pré-requisito.
   */
  async remove(id: number) {

    await this.findOne(id);

    await this.prerequisitoRepository.delete(id);

    return {
      mensagem:
        'Pré-requisito removido com sucesso',
    };
  }
}