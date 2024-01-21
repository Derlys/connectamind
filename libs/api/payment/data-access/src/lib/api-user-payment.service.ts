import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@connectamind/api-core-data-access'
import { UserFindManyPaymentInput } from './dto/user-find-many-payment.input'
import { PaymentPaging } from './entity/payment-paging.entity'
import { getUserPaymentWhereInput } from './helpers/get-user-payment-where.input'
import { UserCreatePaymentInput } from './dto/user-create-payment.input'

@Injectable()
export class ApiUserPaymentService {
  constructor(private readonly core: ApiCoreService) {}

  async createPayment(userId: string, input: UserCreatePaymentInput) {
    return this.core.data.payment.create({ data: { ...input, ownerId: userId } })
  }

  async findManyPayment(userId: string, input: UserFindManyPaymentInput): Promise<PaymentPaging> {
    return this.core.data.payment
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getUserPaymentWhereInput(userId, input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }
}
