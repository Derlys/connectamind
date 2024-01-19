import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@connectamind/api-core-data-access'
import { ApiAdminPostService } from './api-admin-post.service'

import { ApiPostService } from './api-post.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPostService, ApiAdminPostService],
  exports: [ApiPostService],
})
export class ApiPostDataAccessModule {}
