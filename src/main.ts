import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

console.log('HOST:', process.env.DB_HOST);
console.log('PORT:', process.env.DB_PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 const config = new DocumentBuilder()
  .setTitle('API Rematrícula')
  .setDescription('Documentação da API de rematrícula de alunos')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Insira o token JWT gerado no login',
      in: 'header',
    },
    'token', // Esse é o nome de referência para usar nos Controllers
  )
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);

  await app.listen(3001);
}
bootstrap();