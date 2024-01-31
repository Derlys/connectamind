import { faker } from '@faker-js/faker'
import { IdentityProvider, Prisma, Token, UserRole, UserStatus } from '@prisma/client'
import { slugifyId } from './helpers/slugify-id'
import { postDerlys } from './provision-data/derlys-dev-to'

const prices = [
  //
  { token: Token.Bonk, amount: '10' },
  { token: Token.Sol, amount: '0.1' },
  { token: Token.Usdc, amount: '9.99' },
]
export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    username: 'derlys',
    name: 'Derlys Dominguez',
    role: UserRole.Admin,
    developer: true,
    avatarUrl: 'https://avatars.githubusercontent.com/u/58484607?v=4',
    posts: {
      create: [
        ...postDerlys.map((post) => ({
          ...post,
          updatedAt: post.createdAt,
          prices: { create: prices },
        })),
      ].map((post) => ({ ...post, id: slugifyId(post.title).toLowerCase() })),
    },
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr' }],
    },
  },
  {
    username: 'alice',
    name: 'Alice in Web3',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    avatarUrl: 'https://mighty.tools/mockmind-api/content/human/76.jpg',
    posts: {
      create: [
        ...postDerlys.map((post) => ({
          ...post,
          title: `${post.title} (Alice)`,
          updatedAt: post.createdAt,
          prices: { create: prices },
        })),
      ].map((post) => ({ ...post, id: slugifyId(post.title).toLowerCase() })),
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
