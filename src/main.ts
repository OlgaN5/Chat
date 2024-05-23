import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './validation/validation.pipe';
import { DatabaseExceptionFilter } from './filters/database-exeption.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionFilter } from './filters/all-exeption.filter';
import { ValidationException } from './exceptions/validation.exception';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
async function bootstrap() {

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionFilter(),new DatabaseExceptionFilter(), new HttpExceptionFilter(),new ValidationExceptionFilter)
  // app.useGlobalFilters()


  const config = new DocumentBuilder()
    .setTitle('Chat')
    .setDescription('Chat websocket')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(3000)
}
bootstrap();
