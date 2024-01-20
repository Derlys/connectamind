import { Injectable } from '@nestjs/common'
import { ApiAdminPostService } from './api-admin-post.service'
import { ApiUserPostService } from './api-user-post.service'

@Injectable()
export class ApiPostService {
  constructor(readonly admin: ApiAdminPostService, readonly user: ApiUserPostService) {}
}
