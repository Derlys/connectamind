import { Injectable } from '@nestjs/common'
import { ApiAdminPaymentService } from './api-admin-payment.service'
import { ApiUserPaymentService } from './api-user-payment.service'

@Injectable()
export class ApiPaymentService {
  constructor(readonly admin: ApiAdminPaymentService, readonly user: ApiUserPaymentService) {}
}
