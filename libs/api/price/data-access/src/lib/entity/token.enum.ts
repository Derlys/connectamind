import { registerEnumType } from '@nestjs/graphql'
import { Token } from '@prisma/client'
export { Token }

registerEnumType(Token, { name: 'Token' })
