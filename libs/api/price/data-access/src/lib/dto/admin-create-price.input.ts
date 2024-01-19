import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreatePriceInput {
  @Field()
  token!: string
  @Field()
  postId!: string
}
