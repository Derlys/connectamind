import { faker } from '@faker-js/faker'
import { IdentityProvider, Prisma, Token, UserRole, UserStatus } from '@prisma/client'

const prices = [
  //
  { token: Token.BONK, amount: '10' },
  { token: Token.SOL, amount: '0.1' },
  { token: Token.USDC, amount: '9.99' },
]
export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    username: 'derlys',
    role: UserRole.Admin,
    developer: true,
    avatarUrl: 'https://avatars.githubusercontent.com/u/58484607?v=4',
    posts: {
      create: [
        { title: 'Derlys Post 1', content: 'Hola!!', prices: { create: prices } },
        { title: 'Derlys Post 2', content: 'Hola!!', prices: { create: prices } },
        { title: 'Derlys Post 3', content: 'Hola!!', prices: { create: prices } },
        { title: 'Derlys Post 4', content: 'Hola!!' },
        { title: 'Derlys Post 5', content: 'Hola!!' },
        { title: 'Derlys Post 6', content: 'Hola!!' },
      ],
    },
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr' }],
    },
  },
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    posts: {
      create: [
        { title: 'Alice Post 1', content: 'Hola from Alice!!' },
        { title: 'Alice Post 2', content: 'Hola from Alice!!' },
        { title: 'Alice Post 3', content: 'Hola from Alice!!' },
        { title: 'Alice Post 4', content: 'Hola from Alice!!' },
        { title: 'Alice Post 5', content: 'Hola from Alice!!', prices: { create: prices } },
        { title: 'Alice Post 6', content: 'Hola from Alice!!', prices: { create: prices } },
      ],
    },
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG' }],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
  },
  // Charlie is a user with no password, so they can only log in with an external provider
  {
    username: 'charlie',
    role: UserRole.User,
  },
  // Dave is set to inactive, so they can't log in
  {
    username: 'dave',
    password: 'password',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
]

export function fakeUsers(count: number): Prisma.UserCreateInput[] {
  return Array.from({ length: count }, (_, index) => fakeUser(index))
}

export function fakeUser(index: number): Prisma.UserCreateInput {
  faker.seed(index)
  const username = faker.internet.userName()
  const password = faker.internet.password()
  const avatarUrl = faker.internet.avatar()
  const name = faker.internet.displayName()

  return {
    avatarUrl,
    name,
    password,
    role: UserRole.User,
    status: UserStatus.Active,
    username,
  }
}
