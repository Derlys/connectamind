import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-stack/api/auth/data-access'
import { Paging } from '@pubkey-stack/api/core/data-access'
import {
  AdminCreateUserInput,
  AdminFindManyUserInput,
  AdminUpdateUserInput,
  ApiUserService,
  User,
} from '@pubkey-stack/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiUserAdminResolver {
  constructor(private readonly service: ApiUserService) {}

  @Mutation(() => User, { nullable: true })
  adminCreateUser(@Args('input') input: AdminCreateUserInput) {
    return this.service.admin.createUser(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteUser(@Args('userId') userId: string) {
    return this.service.admin.deleteUser(userId)
  }

  @Query(() => [User], { nullable: true })
  adminFindManyUser(@Args('input') input: AdminFindManyUserInput) {
    return this.service.admin.findManyUser(input)
  }

  @Query(() => Paging, { nullable: true })
  adminFindManyUserCount(@Args('input') input: AdminFindManyUserInput) {
    return this.service.admin.findManyUserCount(input)
  }

  @Query(() => User, { nullable: true })
  adminFindOneUser(@Args('userId') userId: string) {
    return this.service.admin.findOneUser(userId)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(@Args('userId') userId: string, @Args('input') input: AdminUpdateUserInput) {
    return this.service.admin.updateUser(userId, input)
  }
}
