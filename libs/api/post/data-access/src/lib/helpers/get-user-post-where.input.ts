import { Prisma } from '@prisma/client'
import { UserFindManyPostInput } from '../dto/user-find-many-post.input'

export function getUserPostWhereInput(input: UserFindManyPostInput): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { title: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
