import { Test, TestingModule } from '@nestjs/testing';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { mockGenericService } from '../../test/mocks/service.mock';

describe('CursoController', () => {
  let controller: CursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursoController],
      providers: [
        {
          provide: CursoService,
          useValue: mockGenericService,
        },
      ],
    }).compile();

    controller = module.get<CursoController>(CursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});