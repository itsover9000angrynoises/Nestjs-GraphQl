import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export default class edge {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @CreateDateColumn()
  @Field()
  created_at: string;

  @UpdateDateColumn()
  @Field()
  updated_at: string;

  @Column()
  @Field(type => Int)
  capacity: number;

  @Column()
  @Field()
  node1_alias: string;

  @Column()
  @Field()
  node2_alias: string;
}