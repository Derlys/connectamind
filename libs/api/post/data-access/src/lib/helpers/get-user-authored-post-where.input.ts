import { Prisma } from '@prisma/client'
import { UserFindManyPostInput } from '../dto/user-find-many-post.input'

export function getUserAuthoredPostWhereInput(authorId: string, input: UserFindManyPostInput): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {
    authorId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { title: { contains: input.search, mode: 'insensitive' } },
      { content: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
