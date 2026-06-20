import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Matricula } from '../entities/matricula.entity';
import { Aluno } from '../entities/aluno.entity';
import { Turma } from '../entities/turma.entity';
import { PreRequisito } from '../entities/prerequisito.entity';

import { CreateMatriculaDto } from './dto/create-matricula.dto';

@Injectable()
export class MatriculaService {
  /*
   * Injeta os repositórios do TypeORM.
   */
  constructor(
  @InjectRepository(Matricula)
  private matriculaRepository: Repository<Matricula>,

  @InjectRepository(Aluno)
  private alunoRepository: Repository<Aluno>,

  @InjectRepository(Turma)
  private turmaRepository: Repository<Turma>,

  @InjectRepository(PreRequisito)
  private prerequisitoRepository: Repository<PreRequisito>,
) {}
  /*
   * CREATE
  /*
 * Realiza a rematrícula do aluno.
 */
async create(dto: CreateMatriculaDto) {

  /*
   * Verifica se o aluno existe.
   */
  const aluno =
    await this.alunoRepository.findOneBy({
      id: dto.alunoId,
    });

  if (!aluno) {
    throw new NotFoundException(
      'Aluno não encontrado',
    );
  }

  /*
   * Busca a turma juntamente com a disciplina.
   */
  const turma =
    await this.turmaRepository.findOne({
      where: {
        id: dto.turmaId,
      },
      relations: {
        disciplina: true,
      },
    });

  if (!turma) {
    throw new NotFoundException(
      'Turma não encontrada',
    );
  }

  /*
   * Busca os pré-requisitos da disciplina.
   */
  const prerequisitos =
    await this.prerequisitoRepository.find({
      where: {
        disciplina: {
          id: turma.disciplina.id,
        },
      },
      relations: {
        disciplinaRequisito: true,
      },
    });

  /*
   * Verifica quais disciplinas o aluno já cursou.
   */
  const disciplinasConcluidas =
    await this.disciplinasAluno(aluno.id);

  /*
   * Valida cada pré-requisito.
   */
  for (const prerequisito of prerequisitos) {

    const possuiDisciplina =
      disciplinasConcluidas.some(
        disciplina =>
          disciplina.id ===
          prerequisito.disciplinaRequisito.id,
      );

    if (!possuiDisciplina) {

      throw new BadRequestException(
        `O aluno não possui o pré-requisito: ${prerequisito.disciplinaRequisito.nome}`,
      );
    }
  }

  /*
   * Cria a matrícula.
   */
  const matricula =
    this.matriculaRepository.create({
      aluno,
      turma,
      situacao: 'ATIVA',
      dataMatricula: new Date(),
    });

  /*
   * Salva no banco.
   */
  return this.matriculaRepository.save(
    matricula,
  );
}

  /*
   * READ
   *
   * Lista todas as matrículas.
   */
  findAll() {
    return this.matriculaRepository.find({
      relations: {
        aluno: true,
        turma: {
          disciplina: true,
        },
      },
    });
  }

  /*
   * Lista as matrículas de um aluno.
   */
 findByAluno(alunoId: number) {
  return this.matriculaRepository.find({
    where: {
      aluno: {
        id: alunoId,
      },
    },
    relations: {
      aluno: true,
      turma: {
        disciplina: true,
      },
    },
  });
}

/*
 * Lista as disciplinas já cursadas pelo aluno.
 */
async disciplinasAluno(alunoId: number) {
  const matriculas = await this.matriculaRepository.find({
    where: {
      aluno: {
        id: alunoId,
      },
      situacao: 'CONCLUIDA', // 🎯 A mágica está aqui! Só aceita matérias concluídas.
    },
    relations: {
      turma: {
        disciplina: true,
      },
    },
  });

  return matriculas.map(
    matricula => matricula.turma.disciplina,
  );
}
}