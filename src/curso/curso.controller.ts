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

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';

/*
 * Controller responsável pelas rotas relacionadas aos cursos.
 *
 * O Controller recebe as requisições HTTP
 * e encaminha para o Service executar as regras de negócio.
 *
 */
@ApiTags('Curso') 
@ApiBearerAuth('token') 
@UseGuards(JwtAuthGuard)
@Controller('curso')
export class CursoController {
  /*
   * Injeta o CursoService para utilizar seus métodos.
   */
  constructor(
    private readonly cursoService: CursoService,
  ) {}

  /*
   * POST /curso
   *
   * Cadastra um novo curso.
   *
   * Exige autenticação JWT.
   */
  @Post()
  create(
    @Body() createCursoDto: CreateCursoDto,
  ) {
    return this.cursoService.create(
      createCursoDto,
    );
  }

  /*
   * GET /curso
   *
   * Lista todos os cursos cadastrados.
   *
   * Exige autenticação JWT.
   */
  @Get()
  findAll() {
    return this.cursoService.findAll();
  }

  /*
   * GET /curso/:id
   *
   * Busca um curso específico pelo ID.
   *
   * Exige autenticação JWT.
   */
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.cursoService.findOne(
      Number(id),
    );
  }

  /*
   * PUT /curso/:id
   *
   * Atualiza os dados de um curso.
   *
   * Exige autenticação JWT.
   */
  @Put(':id')
  update(
    @Param('id') id: string,

    @Body()
    updateCursoDto: CreateCursoDto,
  ) {
    return this.cursoService.update(
      Number(id),
      updateCursoDto,
    );
  }

  /*
   * DELETE /curso/:id
   *
   * Remove um curso do sistema.
   *
   * Exige autenticação JWT.
   */
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.cursoService.remove(
      Number(id),
    );
  }
}