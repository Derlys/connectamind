import { Resolver } from '@nestjs/graphql'
import { ApiPostService } from '@connectamind/api-post-data-access'
import { ApiAuthGraphQLUserGuard, CtxUser } from '@connectamind/api-auth-data-access'
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
  userCreatePost(@CtxUser() user: { id: string }, @Args('input') input: UserCreatePostInput) {
    return this.service.user.createPost(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeletePost(@CtxUser() user: { id: string }, @Args('postId') postId: string) {
    return this.service.user.deletePost(user.id, postId)
  }

  @Query(() => PostPaging)
  userFindManyAuthoredPost(@CtxUser() user: { id: string }, @Args('input') input: UserFindManyPostInput) {
    return this.service.user.findManyAuthoredPost(user.id, input)
  }
  @Query(() => PostPaging)
  userFindManyPublishedPost(@CtxUser() user: { id: string }, @Args('input') input: UserFindManyPostInput) {
    return this.service.user.findManyPublishedPost(user.id, input)
  }

  @Query(() => Post, { nullable: true })
  userFindOnePost(@CtxUser() user: { id: string }, @Args('postId') postId: string) {
    return this.service.user.findOnePost(user.id, postId)
  }

  @Mutation(() => Post, { nullable: true })
  userUpdatePost(
    @CtxUser() user: { id: string },
    @Args('postId') postId: string,
    @Args('input') input: UserUpdatePostInput,
  ) {
    return this.service.user.updatePost(user.id, postId, input)
  }
}
