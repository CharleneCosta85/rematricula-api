import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CursoService } from './curso.service';
import { Curso } from '../entities/curso.entity';
import { mockRepository } from '../../test/mocks/repository.mock';

describe('CursoService', () => {
  let service: CursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursoService,
        {
          provide: getRepositoryToken(Curso),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CursoService>(CursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});