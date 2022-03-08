import { NestFactory } from '@nestjs/core';
import { EdgeModule } from './edge/edge.module';
import { envConfig } from './utils/envConfig';

async function bootstrap() {
  const app = await NestFactory.create(EdgeModule);
  await app.listen(parseInt(envConfig.serverPort));
}
bootstrap();
