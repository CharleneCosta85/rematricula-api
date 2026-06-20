import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TurmaService } from './turma.service';
import { Turma } from '../entities/turma.entity';
import { Disciplina } from '../entities/disciplina.entity';
import { mockRepository } from '../../test/mocks/repository.mock';

describe('TurmaService', () => {
  let service: TurmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TurmaService,
        {
          provide: getRepositoryToken(Turma),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Disciplina),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<TurmaService>(TurmaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});