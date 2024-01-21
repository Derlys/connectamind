import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreatePaymentInput {
  @Field()
  postId!: string
  @Field()
  priceId!: string
  @Field()
  signature!: string
}
