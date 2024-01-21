import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@connectamind/api-core-data-access'
import { AdminFindManyPaymentInput } from './dto/admin-find-many-payment.input'
import { PaymentPaging } from './entity/payment-paging.entity'
import { getAdminPaymentWhereInput } from './helpers/get-admin-payment-where.input'

@Injectable()
export class ApiAdminPaymentService {
  constructor(private readonly core: ApiCoreService) {}

  async deletePayment(paymentId: string) {
    const deleted = await this.core.data.payment.delete({ where: { id: paymentId } })
    return !!deleted
  }

  async findManyPayment(input: AdminFindManyPaymentInput): Promise<PaymentPaging> {
    return this.core.data.payment
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminPaymentWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOnePayment(paymentId: string) {
    return this.core.data.payment.findUnique({ where: { id: paymentId } })
  }
}
