import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@connectamind/api-core-data-access'
import { ApiAdminPaymentService } from './api-admin-payment.service'

import { ApiPaymentService } from './api-payment.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPaymentService, ApiAdminPaymentService],
  exports: [ApiPaymentService],
})
export class ApiPaymentDataAccessModule {}
