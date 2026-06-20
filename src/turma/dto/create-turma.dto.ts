import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTurmaDto {

  @ApiProperty({
    example: 1,
  })
  // Disciplina ofertada
  @IsNumber()
  disciplinaId: number;

  @ApiProperty({
    example: 'Prof. João da Silva',
  })
  // Professor responsável
  @IsNotEmpty()
  professor: string;

 @ApiProperty({
    example: 'Segunda 19h às 22h',
  }) 

  // Horário da turma
  @IsNotEmpty()
  horario: string;

  @ApiProperty({
    example: '2026.1',
  })
  // Ex.: 2026.1
  @IsNotEmpty()
  periodoLetivo: string;
}