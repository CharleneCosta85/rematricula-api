import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/aluno (POST)', async () => {
    return request(app.getHttpServer())
      .post('/aluno')
      .send({
        nome: 'Teste',
        email: 'teste@email.com',
        senha: '123456',
        matricula: '20260099',
        cursoId: 1,
      })
      .expect(201);
  });

  it('/auth/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'teste@email.com',
        senha: '123456',
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});