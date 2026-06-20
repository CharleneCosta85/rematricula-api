import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {

  @ApiProperty({
    example: 'Charlene Costa',
    description: 'Nome completo do aluno',
  })
  @IsNotEmpty({
    message: 'O nome é obrigatório',
  })
  nome: string;

  @ApiProperty({
    example: '20260001',
    description: 'Matrícula institucional',
  })
  @IsNotEmpty({
    message: 'A matrícula é obrigatória',
  })
  matricula: string;

  @ApiProperty({
    example: 'charlene@email.com',
    description: 'E-mail do aluno',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um e-mail válido',
    },
  )
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do aluno',
    minLength: 6,
  })
  @MinLength(6, {
    message: 'A senha deve possuir pelo menos 6 caracteres',
  })
  senha: string;

  @ApiProperty({
    example: 1,
    description: 'ID do curso',
  })
  @IsNumber(
    {},
    {
      message: 'cursoId deve ser numérico',
    },
  )
  cursoId: number;
}