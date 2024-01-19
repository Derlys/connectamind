import { Module } from '@nestjs/common'
import { ApiPriceDataAccessModule } from '@connectamind/api-price-data-access'
import { ApiAdminPriceResolver } from './api-admin-price.resolver'

@Module({
  imports: [ApiPriceDataAccessModule],
  providers: [ApiAdminPriceResolver],
})
export class ApiPriceFeatureModule {}
