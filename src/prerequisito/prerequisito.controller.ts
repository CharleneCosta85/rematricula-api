import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { PrerequisitoService } from './prerequisito.service';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('prerequisito')
@UseGuards(JwtAuthGuard)
export class PrerequisitoController {

  /*
   * Injeta o service responsável
   * pelas regras de negócio.
   */
  constructor(
    private readonly prerequisitoService: PrerequisitoService,
  ) {}

  /*
   * POST /prerequisito
   *
   * Cadastra um novo pré-requisito.
   */
  @Post()
  create(
    @Body() dto: CreatePrerequisitoDto,
  ) {
    return this.prerequisitoService.create(dto);
  }

  /*
   * GET /prerequisito
   *
   * Lista todos os pré-requisitos.
   */
  @Get()
  findAll() {
    return this.prerequisitoService.findAll();
  }

  /*
   * GET /prerequisito/:id
   *
   * Busca um pré-requisito pelo ID.
   */
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.prerequisitoService.findOne(
      Number(id),
    );
  }

  /*
   * DELETE /prerequisito/:id
   *
   * Remove um pré-requisito.
   */
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.prerequisitoService.remove(
      Number(id),
    );
  }
}