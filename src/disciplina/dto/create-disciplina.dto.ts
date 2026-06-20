import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisciplinaDto {
  @ApiProperty({
    example: 'POO001',
    description: 'Código da disciplina',
  })
  @IsString({ message: 'O código deve ser um texto' })
  @IsNotEmpty({ message: 'O código é obrigatório' })
  codigo: string;

  @ApiProperty({
    example: 'Programação Orientada a Objetos',
    description: 'Nome da disciplina',
  })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({
    example: 80,
    description: 'Carga horária da disciplina',
  })
  @IsNumber({}, { message: 'A carga horária deve ser um número' })
  @IsNotEmpty({ message: 'A carga horária é obrigatória' })
  cargaHoraria: number;

  @ApiProperty({
    example: 4,
    description: 'ID do curso',
  })
  @IsNumber({}, { message: 'O ID do curso deve ser um número' })
  @IsNotEmpty({ message: 'O ID do curso é obrigatório' })
  cursoId: number;
}