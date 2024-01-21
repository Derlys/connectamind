import { Injectable } from '@nestjs/common'
import { ApiAdminPaymentService } from './api-admin-payment.service'

@Injectable()
export class ApiPaymentService {
  constructor(readonly admin: ApiAdminPaymentService) {}
}
