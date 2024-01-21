import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Identity, IdentityProvider } from '@connectamind/api-identity-data-access'
import { User } from '@connectamind/api-user-data-access'

@Resolver(() => User)
export class ApiUserResolver {
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user.avatarUrl?.length ? user.avatarUrl : null
  }
  @ResolveField(() => String, { nullable: true })
  publicKey(@Parent() user: User) {
    return user.identities?.length
      ? user.identities.find(({ provider }) => provider === IdentityProvider.Solana)?.providerId
      : null
  }

  @ResolveField(() => String, { nullable: true })
  profileUrl(@Parent() user: User) {
    return ['/profile', user.username].join('/')
  }

  @ResolveField(() => [Identity], { nullable: true })
  identities(@Parent() user: User) {
    return user.identities ?? []
  }
}
