import { Injectable } from '@nestjs/common'
import { ApiAdminPriceService } from './api-admin-price.service'

@Injectable()
export class ApiPriceService {
  constructor(readonly admin: ApiAdminPriceService) {}
}
