import { Injectable } from '@nestjs/common'
import { ApiCoreService, slugifyId } from '@connectamind/api-core-data-access'
import { AdminCreatePostInput } from './dto/admin-create-post.input'
import { AdminFindManyPostInput } from './dto/admin-find-many-post.input'
import { AdminUpdatePostInput } from './dto/admin-update-post.input'
import { PostPaging } from './entity/post-paging.entity'
import { getAdminPostWhereInput } from './helpers/get-admin-post-where.input'

@Injectable()
export class ApiAdminPostService {
  constructor(private readonly core: ApiCoreService) {}

  async createPost(userId: string, input: AdminCreatePostInput) {
    return this.core.data.post.create({
      data: { ...input, authorId: userId, id: slugifyId(input.title).toLowerCase() },
    })
  }

  async deletePost(postId: string) {
    const deleted = await this.core.data.post.delete({ where: { id: postId } })
    return !!deleted
  }

  async findManyPost(input: AdminFindManyPostInput): Promise<PostPaging> {
    return this.core.data.post
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminPostWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOnePost(postId: string) {
    return this.core.data.post.findUnique({ where: { id: postId } })
  }

  async updatePost(postId: string, input: AdminUpdatePostInput) {
    return this.core.data.post.update({ where: { id: postId }, data: input })
  }
}
