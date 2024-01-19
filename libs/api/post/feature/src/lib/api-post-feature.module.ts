import { Module } from '@nestjs/common'
import { ApiPostDataAccessModule } from '@connectamind/api-post-data-access'
import { ApiAdminPostResolver } from './api-admin-post.resolver'

@Module({
  imports: [ApiPostDataAccessModule],
  providers: [ApiAdminPostResolver],
})
export class ApiPostFeatureModule {}
