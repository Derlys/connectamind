import { Resolver } from '@nestjs/graphql'
import { ApiPriceService } from '@connectamind/api-price-data-access'
import { ApiAuthGraphQLAdminGuard } from '@connectamind/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriceInput,
  AdminFindManyPriceInput,
  Price,
  PricePaging,
  AdminUpdatePriceInput,
} from '@connectamind/api-price-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminPriceResolver {
  constructor(private readonly service: ApiPriceService) {}

  @Mutation(() => Price, { nullable: true })
  adminCreatePrice(@Args('input') input: AdminCreatePriceInput) {
    return this.service.admin.createPrice(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeletePrice(@Args('priceId') priceId: string) {
    return this.service.admin.deletePrice(priceId)
  }

  @Query(() => PricePaging)
  adminFindManyPrice(@Args('input') input: AdminFindManyPriceInput) {
    return this.service.admin.findManyPrice(input)
  }

  @Query(() => Price, { nullable: true })
  adminFindOnePrice(@Args('priceId') priceId: string) {
    return this.service.admin.findOnePrice(priceId)
  }

  @Mutation(() => Price, { nullable: true })
  adminUpdatePrice(@Args('priceId') priceId: string, @Args('input') input: AdminUpdatePriceInput) {
    return this.service.admin.updatePrice(priceId, input)
  }
}
