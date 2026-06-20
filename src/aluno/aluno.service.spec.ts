import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlunoService } from './aluno.service';
import { Aluno } from '../entities/aluno.entity';
import { mockRepository } from '../../test/mocks/repository.mock';

describe('AlunoService', () => {
  let service: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunoService,
        {
          provide: getRepositoryToken(Aluno),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});