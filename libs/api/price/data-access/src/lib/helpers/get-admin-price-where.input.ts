import { Prisma } from '@prisma/client'
import { AdminFindManyPriceInput } from '../dto/admin-find-many-price.input'

export function getAdminPriceWhereInput(input: AdminFindManyPriceInput): Prisma.PriceWhereInput {
  const where: Prisma.PriceWhereInput = {
    postId: input.postId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { token: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
