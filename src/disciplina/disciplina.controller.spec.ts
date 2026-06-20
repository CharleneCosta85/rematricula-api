import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinaController } from './disciplina.controller';
import { DisciplinaService } from './disciplina.service';
import { mockGenericService } from '../../test/mocks/service.mock';

describe('DisciplinaController', () => {
  let controller: DisciplinaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisciplinaController],
      providers: [
        {
          provide: DisciplinaService,
          useValue: mockGenericService,
        },
      ],
    }).compile();

    controller = module.get<DisciplinaController>(DisciplinaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});