import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@connectamind/api-core-data-access'

@InputType()
export class UserFindManyPaymentInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
