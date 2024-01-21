import { Prisma } from '@prisma/client'
import { UserFindManyPaymentInput } from '../dto/user-find-many-payment.input'

export function getUserPaymentWhereInput(ownerId: string, input: UserFindManyPaymentInput): Prisma.PaymentWhereInput {
  const where: Prisma.PaymentWhereInput = {
    ownerId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { signature: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
