import { Injectable } from '@nestjs/common'
import { ApiAdminPostService } from './api-admin-post.service'

@Injectable()
export class ApiPostService {
  constructor(readonly admin: ApiAdminPostService) {}
}
