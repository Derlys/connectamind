import { Prisma } from '@prisma/client'
import { AdminFindManyPaymentInput } from '../dto/admin-find-many-payment.input'

export function getAdminPaymentWhereInput(input: AdminFindManyPaymentInput): Prisma.PaymentWhereInput {
  const where: Prisma.PaymentWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { signature: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
