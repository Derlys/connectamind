import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@connectamind/api-auth-data-access'
import {
  AdminCreateIdentityInput,
  AdminFindManyIdentityInput,
  ApiIdentityService,
  Identity,
} from '@connectamind/api-identity-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminIdentityResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Identity, { nullable: true })
  adminCreateIdentity(@Args('input') input: AdminCreateIdentityInput) {
    return this.service.admin.createIdentity(input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIdentity(@Args('identityId') identityId: string) {
    return this.service.admin.deleteIdentity(identityId)
  }
  @Query(() => [Identity], { nullable: true })
  adminFindManyIdentity(@Args('input') input: AdminFindManyIdentityInput) {
    return this.service.admin.findManyIdentity(input)
  }
}
