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

import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/*
 * Controller responsável pelas rotas relacionadas aos alunos.
 *
 * O Controller recebe as requisições HTTP
 * e encaminha para o Service executar as regras de negócio.
 */
@Controller('aluno')
export class AlunoController {
  /*
   * Injeta o AlunoService para utilizar seus métodos.
   */
  constructor(
    private readonly alunoService: AlunoService,
  ) {}

  /*
   * POST /aluno
   *
   * Cadastro de aluno.
   *
   * Esta rota é pública porque o aluno ainda
   * não possui login nem token JWT.
   */
  @Post()
  create(
    @Body() createAlunoDto: CreateAlunoDto,
  ) {
    return this.alunoService.create(
      createAlunoDto,
    );
  }

  /*
   * GET /aluno
   *
   * Lista todos os alunos cadastrados.
   *
   * Exige autenticação JWT.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  /*
   * GET /aluno/:id
   *
   * Busca um aluno específico pelo ID.
   *
   * Exige autenticação JWT.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.alunoService.findOne(
      Number(id),
    );
  }

  /*
   * PUT /aluno/:id
   *
   * Atualiza os dados de um aluno.
   *
   * Exige autenticação JWT.
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,

    @Body()
    updateAlunoDto: CreateAlunoDto,
  ) {
    return this.alunoService.update(
      Number(id),
      updateAlunoDto,
    );
  }

  /*
   * DELETE /aluno/:id
   *
   * Remove um aluno do sistema.
   *
   * Exige autenticação JWT.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.alunoService.remove(
      Number(id),
    );
  }
}