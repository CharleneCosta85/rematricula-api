import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { MatriculaService } from './matricula.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('matricula')
@UseGuards(JwtAuthGuard)
export class MatriculaController {
  constructor(
    private readonly matriculaService: MatriculaService,
  ) {}

  /*
   * Realiza a rematrícula do aluno.
   */
  @Post()
  create(@Body() dto: CreateMatriculaDto) {
    return this.matriculaService.create(dto);
  }

  /*
   * Lista todas as matrículas.
   */
  @Get()
  findAll() {
    return this.matriculaService.findAll();
  }

  /*
   * Lista as matrículas de um aluno.
   */
  @Get('aluno/:id')
  findByAluno(
    @Param('id') id: string,
  ) {
    return this.matriculaService.findByAluno(
      Number(id),
    );
  }

  /*
   * Lista as disciplinas cursadas pelo aluno.
   */
  @Get('aluno/:id/disciplinas')
  disciplinasAluno(
    @Param('id') id: string,
  ) {
    return this.matriculaService.disciplinasAluno(
      Number(id),
    );
  }
}