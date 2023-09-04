import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-stack/api/core/data-access'
import { UserFindManyUserInput } from './dto/user-find-many-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserPaging } from './entity/user-paging.entity'
import { parseUserFindManyUserInput } from './helpers/parse-user-find-many-user.input'

@Injectable()
export class ApiUserUserService {
  private readonly logger = new Logger(ApiUserUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async findManyUser(input: UserFindManyUserInput): Promise<UserPaging> {
    const { where, orderBy, limit, page } = parseUserFindManyUserInput(input)
    const [data, meta] = await this.core.data.user.paginate({ where, orderBy }).withPages({ limit, page })
    return { data, meta }
  }

  async updateUser(userId: string, input: UserUpdateUserInput) {
    return this.core.data.user.update({ where: { id: userId }, data: input })
  }

  async findOneUser(username: string) {
    const found = await this.core.data.user.findUnique({ where: { username } })

    if (!found) {
      throw new Error(`User ${username} not found`)
    }
    return found
  }
}
