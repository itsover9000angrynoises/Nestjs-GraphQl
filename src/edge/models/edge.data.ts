import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class edgeData {

  @Field()
  node1_alias: string;

  @Field()
  node2_alias: string;
}