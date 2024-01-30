import { Button } from '@mantine/core'
import { useAuth } from '@connectamind/web-auth-data-access'
import { UiGrid } from '@connectamind/web-ui-core'
import { useUserFineOneUser } from '@connectamind/web-user-data-access'
import { UserUiProfile } from '@connectamind/web-user-ui'
import { UiContainer, UiLoader, UiWarning } from '@connectamind/web-ui-core'
import { Link, useParams, useRoutes } from 'react-router-dom'
import { UserDetailPostListFeature } from './user-detail-post-list-feature'
import { UserDetailPostDetailFeature } from './user-detail-post-detail-feature'
import { AuthorPostEditFeature } from '@connectamind/web-post-feature'

export function UserDetailFeature() {
  const { user: authUser } = useAuth()
  const { username } = useParams<{ username: string }>() as { username: string }
  const { user, query } = useUserFineOneUser({ username })

  const routes = useRoutes([
    { index: true, element: <UserDetailPostListFeature username={username} /> },
    { path: ':postId/edit/*', element: <AuthorPostEditFeature /> },
    { path: ':postId', element: <UserDetailPostDetailFeature username={username} /> },
  ])

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found" />
  }

  const isAuthUser = authUser?.id === user.id

  return (
    <UiContainer>
      <UiGrid
        sidebar={
          <UserUiProfile
            user={user}
            action={
              isAuthUser ? (
                <Button size="xs" variant="light" component={Link} to={`/settings`}>
                  Edit profile
                </Button>
              ) : null
            }
          />
        }
      >
        {routes}
      </UiGrid>
    </UiContainer>
  )
}
