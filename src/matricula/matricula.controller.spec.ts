import { Test, TestingModule } from '@nestjs/testing';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { mockGenericService } from '../../test/mocks/service.mock';

describe('MatriculaController', () => {
  let controller: MatriculaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatriculaController],
      providers: [
        {
          provide: MatriculaService,
          useValue: mockGenericService,
        },
      ],
    }).compile();

    controller = module.get<MatriculaController>(MatriculaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});