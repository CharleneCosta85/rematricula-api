import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/*
 * Controller responsável pelas rotas relacionadas às disciplinas.
 *
 * Recebe as requisições HTTP e encaminha para o Service.
 *
 * Todas as rotas exigem autenticação JWT.
 */
@UseGuards(JwtAuthGuard)
@Controller('disciplina')
export class DisciplinaController {
  /*
   * Injeta o DisciplinaService.
   */
  constructor(
    private readonly disciplinaService: DisciplinaService,
  ) {}

  /*
   * POST /disciplina
   *
   * Cadastra uma nova disciplina.
   */
  @Post()
  create(
    @Body()
    createDisciplinaDto: CreateDisciplinaDto,
  ) {
    return this.disciplinaService.create(
      createDisciplinaDto,
    );
  }

  /*
   * GET /disciplina
   *
   * Lista todas as disciplinas.
   */
  @Get()
  findAll() {
    return this.disciplinaService.findAll();
  }

  /*
   * GET /disciplina/:id
   *
   * Busca uma disciplina pelo ID.
   */
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.disciplinaService.findOne(
      Number(id),
    );
  }

  /*
   * PUT /disciplina/:id
   *
   * Atualiza os dados de uma disciplina.
   */
  @Put(':id')
  update(
    @Param('id') id: string,

    @Body()
    updateDisciplinaDto: CreateDisciplinaDto,
  ) {
    return this.disciplinaService.update(
      Number(id),
      updateDisciplinaDto,
    );
  }

  /*
   * DELETE /disciplina/:id
   *
   * Remove uma disciplina.
   */
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.disciplinaService.remove(
      Number(id),
    );
  }
}