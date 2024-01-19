import { Field, InputType } from '@nestjs/graphql'
import { Token } from '../entity/token.enum'

@InputType()
export class AdminCreatePriceInput {
  @Field(() => Token)
  token!: Token
  @Field()
  postId!: string
  @Field()
  amount!: string
}
