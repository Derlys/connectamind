import { Module } from '@nestjs/common'
import { ApiPostDataAccessModule } from '@connectamind/api-post-data-access'
import { ApiAdminPostResolver } from './api-admin-post.resolver'
import { ApiUserPostResolver } from './api-user-post.resolver'

@Module({
  imports: [ApiPostDataAccessModule],
  providers: [ApiUserPostResolver, ApiAdminPostResolver],
})
export class ApiPostFeatureModule {}
