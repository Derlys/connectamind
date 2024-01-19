import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@connectamind/api-core-data-access'
import { Post } from './post.entity'

@ObjectType()
export class PostPaging extends PagingResponse<Post>(Post) {}
