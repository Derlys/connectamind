import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@connectamind/api-core-feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
