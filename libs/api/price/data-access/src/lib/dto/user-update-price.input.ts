import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdatePriceInput {
  @Field({ nullable: true })
  amount?: string
}
