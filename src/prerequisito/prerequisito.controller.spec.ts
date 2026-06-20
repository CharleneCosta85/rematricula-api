import { Test, TestingModule } from '@nestjs/testing';
import { PrerequisitoController } from './prerequisito.controller';
import { PrerequisitoService } from './prerequisito.service';
import { mockGenericService } from '../../test/mocks/service.mock';

describe('PrerequisitoController', () => {
  let controller: PrerequisitoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrerequisitoController],
      providers: [
        {
          provide: PrerequisitoService,
          useValue: mockGenericService,
        },
      ],
    }).compile();

    controller = module.get<PrerequisitoController>(PrerequisitoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});