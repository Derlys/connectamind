import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@connectamind/api-user-data-access'

@ObjectType()
export class Post {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  title!: string
  @Field()
  content!: string
  @Field(() => User, { nullable: true })
  author?: User
  @Field()
  authorId!: string
}
