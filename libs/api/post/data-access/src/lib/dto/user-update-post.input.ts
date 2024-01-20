import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdatePostInput {
  @Field({ nullable: true })
  title?: string
  @Field({ nullable: true })
  content?: string
}
