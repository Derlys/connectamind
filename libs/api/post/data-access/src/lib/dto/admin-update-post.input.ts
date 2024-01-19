import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdatePostInput {
  @Field({ nullable: true })
  title?: string
}
