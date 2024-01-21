import { Resolver } from '@nestjs/graphql'
import { ApiPaymentService } from '@connectamind/api-payment-data-access'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@connectamind/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { UserCreatePaymentInput, Payment, PaymentPaging } from '@connectamind/api-payment-data-access'
import { UserFindManyPaymentInput } from '@connectamind/api-payment-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserPaymentResolver {
  constructor(private readonly service: ApiPaymentService) {}

  @Mutation(() => Payment, { nullable: true })
  userCreatePayment(@CtxUser() user: { id: string }, @Args('input') input: UserCreatePaymentInput) {
    return this.service.user.createPayment(user.id, input)
  }

  @Query(() => PaymentPaging)
  userFindManyPayment(@CtxUser() user: { id: string }, @Args('input') input: UserFindManyPaymentInput) {
    return this.service.user.findManyPayment(user.id, input)
  }
}
