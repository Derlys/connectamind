import { Prisma } from '@prisma/client'
import { AdminFindManyPostInput } from '../dto/admin-find-many-post.input'

export function getAdminPostWhereInput(input: AdminFindManyPostInput): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { title: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
