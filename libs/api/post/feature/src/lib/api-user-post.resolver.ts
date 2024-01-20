import { Resolver } from '@nestjs/graphql'
import { ApiPostService } from '@connectamind/api-post-data-access'
import { ApiAuthGraphQLUserGuard } from '@connectamind/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePostInput,
  UserFindManyPostInput,
  Post,
  PostPaging,
  UserUpdatePostInput,
} from '@connectamind/api-post-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserPostResolver {
  constructor(private readonly service: ApiPostService) {}

  @Mutation(() => Post, { nullable: true })
  userCreatePost(@Args('input') input: UserCreatePostInput) {
    return this.service.user.createPost(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeletePost(@Args('postId') postId: string) {
    return this.service.user.deletePost(postId)
  }

  @Query(() => PostPaging)
  userFindManyPost(@Args('input') input: UserFindManyPostInput) {
    return this.service.user.findManyPost(input)
  }

  @Query(() => Post, { nullable: true })
  userFindOnePost(@Args('postId') postId: string) {
    return this.service.user.findOnePost(postId)
  }

  @Mutation(() => Post, { nullable: true })
  userUpdatePost(@Args('postId') postId: string, @Args('input') input: UserUpdatePostInput) {
    return this.service.user.updatePost(postId, input)
  }
}
