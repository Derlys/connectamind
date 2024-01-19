import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Price {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  token!: string
  @Field()
  postId!: string
}
