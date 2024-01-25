import { Prisma } from '@prisma/client'
import { UserFindManyPostInput } from '../dto/user-find-many-post.input'

export function getUserPublishedPostWhereInput(input: UserFindManyPostInput): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {
    prices: { some: {} },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { title: { contains: input.search, mode: 'insensitive' } },
      { content: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  if (input.username) {
    where.author = { username: input.username }
  }

  return where
}
