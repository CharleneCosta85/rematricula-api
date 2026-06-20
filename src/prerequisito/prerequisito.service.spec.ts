import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';

import { PrerequisitoService } from './prerequisito.service';

import { PreRequisito } from '../entities/prerequisito.entity';
import { Disciplina } from '../entities/disciplina.entity';

import { mockRepository } from '../../test/mocks/repository.mock';

describe('PrerequisitoService', () => {
  let service: PrerequisitoService;

  beforeEach(async () => {

    /*
     * Cria um módulo de teste simulando
     * as dependências do serviço.
     */
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          PrerequisitoService,

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

          /*
           * Mock do repositório
           * de disciplinas.
           */
          {
            provide:
              getRepositoryToken(
                Disciplina,
              ),
            useValue: mockRepository(),
          },
        ],
      }).compile();

    service =
      module.get<PrerequisitoService>(
        PrerequisitoService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});