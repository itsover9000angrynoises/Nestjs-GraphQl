import { RabbitSubscribe,AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import edge from './edge.entity';
import { edgeData } from './models/edge.data';
import { RabbitModule } from './rabbitmq';
import { envConfig } from '../utils/envConfig';

@Injectable()
export class EdgeService {
  constructor(@InjectRepository(edge) private edgeRepo: Repository<edge>,
    private readonly amqpConnection: AmqpConnection) { }


  async createEdge(newEdgeData: edgeData): Promise<edge> {
    const dataForDB = new edge();
    dataForDB.capacity = Math.floor(Math.random() * (1000000 - 10000 + 1) + 10000)
    dataForDB.node1_alias = newEdgeData.node1_alias;
    dataForDB.node2_alias = newEdgeData.node2_alias;
    const newEdge = this.edgeRepo.create(dataForDB);
    const dataFromDb = await this.edgeRepo.save(newEdge);
    this.amqpConnection.publish(
      envConfig.rabbitMQExchange,
      envConfig.rabbitMQRoutingKey,
      dataFromDb
    )
    return dataFromDb;
  }

  @RabbitSubscribe({
    exchange: envConfig.rabbitMQExchange,
    routingKey: envConfig.rabbitMQRoutingKey
  })
  async SubHandler(msg: edge) {
    console.log(`New channel between ${msg.node1_alias} and
      ${msg.node2_alias} with a capacity of ${msg.capacity} has been created.`);
  }

  async getEdge(edgeId: number): Promise<edge> {
    return this.edgeRepo.findOneOrFail(edgeId);
  }

  async getEdges(): Promise<edge[]> {
    return this.edgeRepo.find();
  }
}
