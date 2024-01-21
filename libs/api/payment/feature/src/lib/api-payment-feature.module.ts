import { Module } from '@nestjs/common'
import { ApiPaymentDataAccessModule } from '@connectamind/api-payment-data-access'
import { ApiAdminPaymentResolver } from './api-admin-payment.resolver'
import { ApiUserPaymentResolver } from './api-user-payment.resolver'

@Module({
  imports: [ApiPaymentDataAccessModule],
  providers: [ApiAdminPaymentResolver, ApiUserPaymentResolver],
})
export class ApiPaymentFeatureModule {}
