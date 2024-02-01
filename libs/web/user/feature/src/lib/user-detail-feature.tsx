import { useAuth } from '@connectamind/web-auth-data-access'
import { UiLoader, UiWarning } from '@connectamind/web-ui-core'
import { useUserFineOneUser } from '@connectamind/web-user-data-access'
import { useParams } from 'react-router-dom'
import { UserDetailFeatureRoutes } from './user-detail-feature.routes'

export function UserDetailFeature() {
  const { user: authUser } = useAuth()
  const { username } = useParams<{ username: string }>() as { username: string }
  const { user, query } = useUserFineOneUser({ username })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found" />
  }

  const isAuthUser = authUser?.id === user.id

  return <UserDetailFeatureRoutes user={user} isAuthUser={isAuthUser} />
}
