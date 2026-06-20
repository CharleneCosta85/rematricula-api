import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatriculaDto {

  @ApiProperty({
    example: 1,
  })
  // Aluno que realizará a matrícula
  @IsNumber()
  alunoId: number;

  @ApiProperty({
    example: 3,
  })
  // Turma escolhida
  @IsNumber()
  turmaId: number;
}