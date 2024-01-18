import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@connectamind/api-core-data-access'

@InputType()
export class UserFindManyUserInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
