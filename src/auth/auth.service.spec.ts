import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aluno } from '../entities/aluno.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { mockRepository } from '../../test/mocks/repository.mock';
import { mockGenericService } from '../../test/mocks/service.mock';

describe('AuthService', () => {
  let service: AuthService;

  const mockRepo = {
    findOne: jest.fn(),
  };

  const mockJwt = {
    sign: jest.fn().mockReturnValue('token_fake'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Aluno),
          useValue: mockRepo,
        },
        {
          provide: JwtService,
          useValue: mockJwt,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve rejeitar login com usuário inexistente', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.login('x@email.com', '123')).rejects.toThrow();
  });
});