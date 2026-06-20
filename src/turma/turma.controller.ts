import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('turma')
@UseGuards(JwtAuthGuard)
export class TurmaController {
  constructor(
    private readonly turmaService: TurmaService,
  ) {}

  @Post()
  create(@Body() dto: CreateTurmaDto) {
    return this.turmaService.create(dto);
  }

  @Get()
  findAll() {
    return this.turmaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turmaService.findOne(
      Number(id),
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateTurmaDto,
  ) {
    return this.turmaService.update(
      Number(id),
      dto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turmaService.remove(
      Number(id),
    );
  }

  @Get('periodo/:periodo')
  findByPeriodo(
    @Param('periodo') periodo: string,
  ) {
    return this.turmaService.findByPeriodo(
      periodo,
    );
  }
}