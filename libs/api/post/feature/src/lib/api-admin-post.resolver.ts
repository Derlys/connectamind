import { Resolver } from '@nestjs/graphql'
import { ApiPostService } from '@connectamind/api-post-data-access'
import { ApiAuthGraphQLAdminGuard, CtxUser } from '@connectamind/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePostInput,
  AdminFindManyPostInput,
  Post,
  PostPaging,
  AdminUpdatePostInput,
} from '@connectamind/api-post-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAdminPostResolver {
  constructor(private readonly service: ApiPostService) {}

  @Mutation(() => Post, { nullable: true })
  adminCreatePost(@CtxUser() user: { id: string }, @Args('input') input: AdminCreatePostInput) {
    return this.service.admin.createPost(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeletePost(@Args('postId') postId: string) {
    return this.service.admin.deletePost(postId)
  }

  @Query(() => PostPaging)
  adminFindManyPost(@Args('input') input: AdminFindManyPostInput) {
    return this.service.admin.findManyPost(input)
  }

  @Query(() => Post, { nullable: true })
  adminFindOnePost(@Args('postId') postId: string) {
    return this.service.admin.findOnePost(postId)
  }

  @Mutation(() => Post, { nullable: true })
  adminUpdatePost(@Args('postId') postId: string, @Args('input') input: AdminUpdatePostInput) {
    return this.service.admin.updatePost(postId, input)
  }
}
