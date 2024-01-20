import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@connectamind/api-core-data-access'
import { UserCreatePostInput } from './dto/user-create-post.input'
import { UserFindManyPostInput } from './dto/user-find-many-post.input'
import { UserUpdatePostInput } from './dto/user-update-post.input'
import { PostPaging } from './entity/post-paging.entity'
import { getUserPostWhereInput } from './helpers/get-user-post-where.input'

@Injectable()
export class ApiUserPostService {
  constructor(private readonly core: ApiCoreService) {}

  async createPost(input: UserCreatePostInput) {
    return this.core.data.post.create({ data: input })
  }

  async deletePost(postId: string) {
    const deleted = await this.core.data.post.delete({ where: { id: postId } })
    return !!deleted
  }

  async findManyPost(input: UserFindManyPostInput): Promise<PostPaging> {
    return this.core.data.post
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserPostWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOnePost(postId: string) {
    return this.core.data.post.findUnique({ where: { id: postId } })
  }

  async updatePost(postId: string, input: UserUpdatePostInput) {
    return this.core.data.post.update({ where: { id: postId }, data: input })
  }
}
