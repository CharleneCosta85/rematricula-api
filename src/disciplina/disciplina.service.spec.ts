import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DisciplinaService } from './disciplina.service';
import { Disciplina } from '../entities/disciplina.entity';
import { Curso } from '../entities/curso.entity';
import { mockRepository } from '../../test/mocks/repository.mock';

describe('DisciplinaService', () => {
  let service: DisciplinaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DisciplinaService,
        {
          provide: getRepositoryToken(Disciplina),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Curso),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<DisciplinaService>(DisciplinaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});