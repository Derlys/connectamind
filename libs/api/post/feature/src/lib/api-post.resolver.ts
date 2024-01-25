import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiPostService, Post } from '@connectamind/api-post-data-access'

@Resolver(() => Post)
export class ApiPostResolver {
  constructor(private readonly service: ApiPostService) {}

  @ResolveField(() => String)
  postUrl(@Parent() post: Post) {
    return ['/u', post.author?.username, post.id].join('/')
  }
}
