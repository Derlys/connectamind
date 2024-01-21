import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@connectamind/api-core-data-access'
import { Payment } from './payment.entity'

@ObjectType()
export class PaymentPaging extends PagingResponse<Payment>(Payment) {}
