import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@connectamind/api-auth-feature'
import { ApiCoreDataAccessModule } from '@connectamind/api-core-data-access'
import { ApiIdentityFeatureModule } from '@connectamind/api-identity-feature'
import { ApiUserFeatureModule } from '@connectamind/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
