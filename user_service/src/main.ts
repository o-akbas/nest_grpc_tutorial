import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC, // Use Transport.GRPC for gRPC
    options: {
      url: 'localhost:5000', // ??? LOCALHOST OR ORDER SERVICE IP
      protoPath: join(__dirname, '../src/proto/user/user.proto'),
      package: 'user',
      maxReceiveMessageLength: 100 * 1024 * 1024,
    },
  });
  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
