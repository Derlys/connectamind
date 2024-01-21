import { Module } from '@nestjs/common'
import { ApiPaymentDataAccessModule } from '@connectamind/api-payment-data-access'
import { ApiAdminPaymentResolver } from './api-admin-payment.resolver'

@Module({
  imports: [ApiPaymentDataAccessModule],
  providers: [ApiAdminPaymentResolver],
})
export class ApiPaymentFeatureModule {}
