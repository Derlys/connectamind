import { UserFindManyPostInput } from '@connectamind/api-post-data-access'
import { Prisma } from '@prisma/client'

export function getUserPublishedPostWhereInput(authorId: string, input: UserFindManyPostInput): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {
    prices: { some: {} }, //
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
