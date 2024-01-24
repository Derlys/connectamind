import { Injectable } from '@nestjs/common'
import { ApiAdminPriceService } from './api-admin-price.service'
import { ApiUserPriceService } from './api-user-price.service'

@Injectable()
export class ApiPriceService {
  constructor(readonly admin: ApiAdminPriceService, readonly user: ApiUserPriceService) {}
}
