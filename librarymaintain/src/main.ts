import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      'https://fullstack-bp58.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
  });

  const PORT = process.env.PORT || 3005;
  await app.listen(PORT, async () => {
    console.log(`listening on port  ${PORT}`);
  });
}
bootstrap();
