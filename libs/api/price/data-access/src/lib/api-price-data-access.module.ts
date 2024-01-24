import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@connectamind/api-core-data-access'
import { ApiAdminPriceService } from './api-admin-price.service'

import { ApiPriceService } from './api-price.service'
import { ApiUserPriceService } from './api-user-price.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPriceService, ApiAdminPriceService, ApiUserPriceService],
  exports: [ApiPriceService],
})
export class ApiPriceDataAccessModule {}
