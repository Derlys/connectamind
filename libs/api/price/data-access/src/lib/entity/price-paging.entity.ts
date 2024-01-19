import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@connectamind/api-core-data-access'
import { Price } from './price.entity'

@ObjectType()
export class PricePaging extends PagingResponse<Price>(Price) {}
