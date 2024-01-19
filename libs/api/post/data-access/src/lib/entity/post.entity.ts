import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Post {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  title!: string
}
