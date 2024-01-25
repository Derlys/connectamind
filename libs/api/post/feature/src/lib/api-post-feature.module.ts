import { Module } from '@nestjs/common'
import { ApiPostDataAccessModule } from '@connectamind/api-post-data-access'
import { ApiAdminPostResolver } from './api-admin-post.resolver'
import { ApiUserPostResolver } from './api-user-post.resolver'
import { ApiPostResolver } from './api-post.resolver'

@Module({
  imports: [ApiPostDataAccessModule],
  providers: [ApiUserPostResolver, ApiPostResolver, ApiAdminPostResolver],
})
export class ApiPostFeatureModule {}
