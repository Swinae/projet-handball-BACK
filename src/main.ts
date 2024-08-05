import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin :[process.env.ORIGIN],
    methods: 'GET,POST',
    allowedHeaders:'Content-type, Authorization',
  })

  const config = new DocumentBuilder()
    .setTitle('Handball')
    .setDescription('The Handball API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
