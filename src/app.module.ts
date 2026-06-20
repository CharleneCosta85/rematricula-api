import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { AlunoModule } from './aluno/aluno.module';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { TurmaModule } from './turma/turma.module';
import { MatriculaModule } from './matricula/matricula.module';
import { PrerequisitoModule } from './prerequisito/prerequisito.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

TypeOrmModule.forRoot({
  type: 'postgres',

  host: 'localhost',
  port: 5432,

  username: 'postgres',
  password: '0920',
  database: 'rematricula',

  autoLoadEntities: true,
  synchronize: true,
}),
    AuthModule,
    AlunoModule,
    CursoModule,
    DisciplinaModule,
    TurmaModule,
    MatriculaModule,
    PrerequisitoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}