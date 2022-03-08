import { Module } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { EdgeResolver } from './edge.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import edge from './edge.entity';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { envConfig } from '../utils/envConfig';
import { env } from 'process';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.qql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envConfig.postgresHost,
      port: parseInt(envConfig.postgresPort),
      username: envConfig.postgresUsername,
      password: envConfig.postgresPassword,
      database: envConfig.postgresDatabase,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([edge]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: envConfig.rabbitMQExchange,
          type: 'topic',
        },
      ],
      uri: envConfig.rabbitMQURL,
      connectionInitOptions: { wait: false },
    }),],
  providers: [EdgeService, EdgeResolver]
})
export class EdgeModule { }
