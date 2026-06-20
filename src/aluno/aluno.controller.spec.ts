import { Test, TestingModule } from '@nestjs/testing';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { mockGenericService } from '../../test/mocks/service.mock';
describe('AlunoController', () => {
  let controller: AlunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [
        {
          provide: AlunoService,
          useValue: mockGenericService,
        },
      ],
    }).compile();

    controller = module.get<AlunoController>(AlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});