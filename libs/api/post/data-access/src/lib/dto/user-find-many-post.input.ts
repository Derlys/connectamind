import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@connectamind/api-core-data-access'

@InputType()
export class UserFindManyPostInput extends PagingInput() {
  @Field({ nullable: true })
  username?: string
  @Field({ nullable: true })
  search?: string
}
