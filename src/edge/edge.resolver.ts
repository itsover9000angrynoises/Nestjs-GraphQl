import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import edge from './edge.entity';
import { EdgeService } from './edge.service';
import { edgeData } from './models/edge.data';

@Resolver(of => edge)
export class EdgeResolver {
  constructor(private edgeService: EdgeService) { }

  @Query(returns => [edge])
  getEdges(): Promise<edge[]> {
    return this.edgeService.getEdges();
  }
  
  @Query(returns => edge)
  getEdge(@Args('edgeId', { type: () => Int }) edgeId: number): Promise<edge> {
    return this.edgeService.getEdge(edgeId);
  }

  @Mutation(returns => edge)
  createEdge(@Args('edgeData') newEdgeData: edgeData): Promise<edge> {
    return this.edgeService.createEdge(newEdgeData);
  }
}
