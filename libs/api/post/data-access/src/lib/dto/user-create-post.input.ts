import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreatePostInput {
  @Field()
  title!: string
  @Field()
  content!: string
}
