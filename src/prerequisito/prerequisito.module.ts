import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrerequisitoController } from './prerequisito.controller';
import { PrerequisitoService } from './prerequisito.service';
import { PreRequisito } from '../entities/prerequisito.entity';
import { Disciplina } from '../entities/disciplina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreRequisito, Disciplina])],
  controllers: [PrerequisitoController],
  providers: [PrerequisitoService],
})
export class PrerequisitoModule {}