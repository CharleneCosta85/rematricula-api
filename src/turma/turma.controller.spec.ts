import { Test, TestingModule } from '@nestjs/testing';
import { TurmaController } from './turma.controller';
import { TurmaService } from './turma.service';
import { mockGenericService } from '../../test/mocks/service.mock';

describe('TurmaController', () => {
  let controller: TurmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmaController],
      providers: [
        {
          provide: TurmaService,
          useValue: mockGenericService,
        },
      ],
    }).compile();

    controller = module.get<TurmaController>(TurmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});