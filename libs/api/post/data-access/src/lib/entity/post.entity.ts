import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@connectamind/api-user-data-access'
import { Price } from '@connectamind/api-price-data-access'
import { Payment } from '@connectamind/api-payment-data-access'

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
  @Field({ nullable: true })
  content!: string
  @Field(() => User, { nullable: true })
  author?: User
  @Field()
  authorId!: string
  @Field(() => [Price], { nullable: true })
  prices?: Price[]
  @Field(() => Payment, { nullable: true })
  payment?: Payment | null
}
