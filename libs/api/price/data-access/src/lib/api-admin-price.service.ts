import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@connectamind/api-core-data-access'
import { AdminCreatePriceInput } from './dto/admin-create-price.input'
import { AdminFindManyPriceInput } from './dto/admin-find-many-price.input'
import { AdminUpdatePriceInput } from './dto/admin-update-price.input'
import { PricePaging } from './entity/price-paging.entity'
import { getAdminPriceWhereInput } from './helpers/get-admin-price-where.input'

@Injectable()
export class ApiAdminPriceService {
  constructor(private readonly core: ApiCoreService) {}

  async createPrice(input: AdminCreatePriceInput) {
    return this.core.data.price.create({ data: input })
  }

  async deletePrice(priceId: string) {
    const deleted = await this.core.data.price.delete({ where: { id: priceId } })
    return !!deleted
  }

  async findManyPrice(input: AdminFindManyPriceInput): Promise<PricePaging> {
    return this.core.data.price
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminPriceWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOnePrice(priceId: string) {
    return this.core.data.price.findUnique({ where: { id: priceId } })
  }

  async updatePrice(priceId: string, input: AdminUpdatePriceInput) {
    return this.core.data.price.update({ where: { id: priceId }, data: input })
  }
}
