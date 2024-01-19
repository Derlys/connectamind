import { Field, ObjectType } from '@nestjs/graphql'
import { Token } from './token.enum'

@ObjectType()
export class Price {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => Token)
  token!: Token
  @Field()
  postId!: string
  @Field()
  amount!: string
}
