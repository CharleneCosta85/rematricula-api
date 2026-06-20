import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrerequisitoDto {

  @ApiProperty({
    example: 5,
  })
  // Disciplina que possui o pré-requisito
  @IsNumber()
  disciplinaId: number;

  @ApiProperty({
    example: 2,
  })
  // Disciplina exigida
  @IsNumber()
  disciplinaRequisitoId: number;
}