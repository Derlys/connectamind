import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@connectamind/api-core-data-access'
import { UserCreatePostInput } from './dto/user-create-post.input'
import { UserFindManyPostInput } from './dto/user-find-many-post.input'
import { UserUpdatePostInput } from './dto/user-update-post.input'
import { PostPaging } from './entity/post-paging.entity'
import { getUserPostWhereInput } from './helpers/get-user-post-where.input'
import { IdentityProvider } from '@connectamind/api-identity-data-access'

@Injectable()
export class ApiUserPostService {
  constructor(private readonly core: ApiCoreService) {}

  async createPost(userId: string, input: UserCreatePostInput) {
    return this.core.data.post.create({ data: { ...input, authorId: userId } })
  }

  async deletePost(userId: string, postId: string) {
    const found = await this.core.data.post.findFirst({
      where: { id: postId, authorId: userId },
    })
    if (!found) {
      throw new Error('Post not found')
    }
    const deleted = await this.core.data.post.delete({ where: { id: postId } })
    return !!deleted
  }

  async findManyPost(userId: string, input: UserFindManyPostInput): Promise<PostPaging> {
    return this.core.data.post
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserPostWhereInput(input),
        include: { author: true, payments: { where: { ownerId: userId } } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
      .then((result) => {
        return {
          ...result,
          data: result.data.map((post) => {
            const payment = post?.payments.length ? post.payments[0] : null
            return { ...post, payment, content: payment ? post?.content : 'not paid' }
          }),
        }
      })
  }

  async findOnePost(userId: string, postId: string) {
    return this.core.data.post
      .findUnique({
        where: { id: postId },
        include: {
          author: {
            include: {
              identities: {
                where: {
                  provider: IdentityProvider.Solana,
                },
              },
            },
          },
          prices: true,
          payments: {
            where: {
              ownerId: userId,
            },
          },
        },
      })
      .then((post) => {
        const payment = post?.payments.length ? post.payments[0] : null
        return { ...post, payment, content: payment ? post?.content : 'not paid' }
      })
  }

  async updatePost(userId: string, postId: string, input: UserUpdatePostInput) {
    const found = await this.core.data.post.findFirst({
      where: { id: postId, authorId: userId },
    })
    if (!found) {
      throw new Error('Post not found')
    }
    return this.core.data.post.update({ where: { id: postId }, data: input })
  }
}
