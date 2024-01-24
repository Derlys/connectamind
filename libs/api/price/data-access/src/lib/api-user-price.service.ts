import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@connectamind/api-core-data-access'
import { UserCreatePriceInput } from './dto/user-create-price.input'
import { UserUpdatePriceInput } from './dto/user-update-price.input'

@Injectable()
export class ApiUserPriceService {
  constructor(private readonly core: ApiCoreService) {}

  async createPrice(input: UserCreatePriceInput) {
    return this.core.data.price.create({ data: input })
  }

  async deletePrice(priceId: string) {
    const deleted = await this.core.data.price.delete({ where: { id: priceId } })
    return !!deleted
  }

  async updatePrice(priceId: string, input: UserUpdatePriceInput) {
    return this.core.data.price.update({ where: { id: priceId }, data: input })
  }
}
