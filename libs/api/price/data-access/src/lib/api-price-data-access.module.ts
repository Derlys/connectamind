import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@connectamind/api-core-data-access'
import { ApiAdminPriceService } from './api-admin-price.service'

import { ApiPriceService } from './api-price.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriceService, ApiAdminPriceService],
  exports: [ApiPriceService],
})
export class ApiPriceDataAccessModule {}
