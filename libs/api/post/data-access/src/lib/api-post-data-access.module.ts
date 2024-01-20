import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@connectamind/api-core-data-access'
import { ApiAdminPostService } from './api-admin-post.service'

import { ApiPostService } from './api-post.service'
import { ApiUserPostService } from './api-user-post.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPostService, ApiAdminPostService, ApiUserPostService],
  exports: [ApiPostService],
})
export class ApiPostDataAccessModule {}
