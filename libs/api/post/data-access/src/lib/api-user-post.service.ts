import { Injectable } from '@nestjs/common'
import { ApiCoreService, slugifyId } from '@connectamind/api-core-data-access'
import { UserCreatePostInput } from './dto/user-create-post.input'
import { UserFindManyPostInput } from './dto/user-find-many-post.input'
import { UserUpdatePostInput } from './dto/user-update-post.input'
import { PostPaging } from './entity/post-paging.entity'
import { getUserAuthoredPostWhereInput } from './helpers/get-user-authored-post-where.input'
import { IdentityProvider } from '@connectamind/api-identity-data-access'
import { getUserPublishedPostWhereInput } from './helpers/get-user-published-post-where.input'
import { getUserPurchasedPostWhereInput } from './helpers/get-user-purchased-post-where.input'

@Injectable()
export class ApiUserPostService {
  constructor(private readonly core: ApiCoreService) {}

  async createPost(userId: string, input: UserCreatePostInput) {
    const id = await this.findUniqueId(slugifyId(input.title).toLowerCase())
    return this.core.data.post.create({
      data: { ...input, authorId: userId, id },
      include: { author: true },
    })
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

  async findManyAuthoredPost(userId: string, input: UserFindManyPostInput): Promise<PostPaging> {
    return this.core.data.post
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserAuthoredPostWhereInput(userId, input),
        include: { author: true, prices: true, payments: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findManyPublishedPost(userId: string, input: UserFindManyPostInput) {
    return this.core.data.post
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserPublishedPostWhereInput(input),
        include: { author: true, payments: { where: { ownerId: userId } }, prices: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
      .then((result) => {
        return {
          ...result,
          data: result.data.map((post) => {
            const payment = post?.payments.length ? post.payments[0] : null
            const owner = post?.authorId === userId
            return { ...post, payment, content: owner ? post?.content : payment ? post?.content : null }
          }),
        }
      })
  }

  async findManyPurchasedPost(userId: string, input: UserFindManyPostInput) {
    return this.core.data.post
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserPurchasedPostWhereInput(userId, input),
        include: { author: true, payments: { where: { ownerId: userId } }, prices: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
      .then((result) => {
        return {
          ...result,
          data: result.data.map((post) => {
            const payment = post?.payments.length ? post.payments[0] : null
            const owner = post?.authorId === userId
            return { ...post, payment, content: owner ? post?.content : payment ? post?.content : null }
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
          prices: { orderBy: { token: 'asc' } },
          payments: {
            where: {
              ownerId: userId,
            },
          },
        },
      })
      .then((post) => {
        const payment = post?.payments.length ? post.payments[0] : null
        const owner = post?.authorId === userId
        return { ...post, payment, content: owner ? post?.content : payment ? post?.content : null }
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

  async findUniqueId(id: string, suffix = ''): Promise<string> {
    const found = await this.core.data.post.findUnique({ where: { id: `${id}${suffix}` } })
    if (!found) {
      return id + suffix
    }
    // We need to generate a new unique id.
    return this.findUniqueId(id, `-${Math.floor(Math.random() * 10000)}`)
  }
}
