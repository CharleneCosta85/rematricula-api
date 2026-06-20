import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {

  // Nome do curso
   @ApiProperty({
    example: 'Sistemas de Informação',
    description: 'Nome do curso',
  })

  @IsNotEmpty({
    message: 'O nome é obrigatório',
  })
  nome: string;

  // Sigla do curso
 @ApiProperty({
    example: 'SI',
    description: 'Sigla do curso',
  })
   @IsNotEmpty({
    message: 'A sigla é obrigatória',
  })
  
  sigla: string;
}