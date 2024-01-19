import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdatePriceInput {
  @Field({ nullable: true })
  amount?: string
}
