import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ApiPriceService, Price, UserCreatePriceInput, UserUpdatePriceInput } from '@connectamind/api-price-data-access'
import { ApiAuthGraphQLUserGuard } from '@connectamind/api-auth-data-access'
import { UseGuards } from '@nestjs/common'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserPriceResolver {
  constructor(private readonly service: ApiPriceService) {}

  @Mutation(() => Price, { nullable: true })
  userCreatePrice(@Args('input') input: UserCreatePriceInput) {
    return this.service.user.createPrice(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeletePrice(@Args('priceId') priceId: string) {
    return this.service.user.deletePrice(priceId)
  }

  @Mutation(() => Price, { nullable: true })
  userUpdatePrice(@Args('priceId') priceId: string, @Args('input') input: UserUpdatePriceInput) {
    return this.service.user.updatePrice(priceId, input)
  }
}
