import { Resolver } from '@nestjs/graphql'
import { ApiPaymentService } from '@connectamind/api-payment-data-access'
import { ApiAuthGraphQLAdminGuard } from '@connectamind/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AdminFindManyPaymentInput, Payment, PaymentPaging } from '@connectamind/api-payment-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminPaymentResolver {
  constructor(private readonly service: ApiPaymentService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeletePayment(@Args('paymentId') paymentId: string) {
    return this.service.admin.deletePayment(paymentId)
  }

  @Query(() => PaymentPaging)
  adminFindManyPayment(@Args('input') input: AdminFindManyPaymentInput) {
    return this.service.admin.findManyPayment(input)
  }

  @Query(() => Payment, { nullable: true })
  adminFindOnePayment(@Args('paymentId') paymentId: string) {
    return this.service.admin.findOnePayment(paymentId)
  }
}
