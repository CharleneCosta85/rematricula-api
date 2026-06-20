import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';

import { MatriculaService } from './matricula.service';

import { Matricula } from '../entities/matricula.entity';
import { Aluno } from '../entities/aluno.entity';
import { Turma } from '../entities/turma.entity';
import { PreRequisito } from '../entities/prerequisito.entity';

import { mockRepository } from '../../test/mocks/repository.mock';

describe('MatriculaService', () => {
  let service: MatriculaService;

  beforeEach(async () => {

    /*
     * Cria o módulo de teste.
     */
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          MatriculaService,

          /*
           * Mock do repositório
           * de matrículas.
           */
          {
            provide:
              getRepositoryToken(
                Matricula,
              ),
            useValue: mockRepository(),
          },

          /*
           * Mock do repositório
           * de alunos.
           */
          {
            provide:
              getRepositoryToken(
                Aluno,
              ),
            useValue: mockRepository(),
          },

          /*
           * Mock do repositório
           * de turmas.
           */
          {
            provide:
              getRepositoryToken(
                Turma,
              ),
            useValue: mockRepository(),
          },

          /*
           * Mock do repositório
           * de pré-requisitos.
           */
          {
            provide:
              getRepositoryToken(
                PreRequisito,
              ),
            useValue: mockRepository(),
          },
        ],
      }).compile();

    service =
      module.get<MatriculaService>(
        MatriculaService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});