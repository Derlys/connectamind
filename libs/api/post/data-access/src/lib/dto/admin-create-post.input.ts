import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreatePostInput {
  @Field()
  title!: string
}
