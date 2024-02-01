import { User } from '@connectamind/sdk'
import { Link, RouteObject, useRoutes } from 'react-router-dom'
import { useMemo } from 'react'
import { UserDetailPostListFeature } from './user-detail-post-list-feature'
import { AuthorPostEditFeature, AuthorPostFeature } from '@connectamind/web-post-feature'
import { UserDetailPostDetailFeature } from './user-detail-post-detail-feature'
import { UiContainer, UiGrid } from '@connectamind/web-ui-core'
import { UserUiProfile } from '@connectamind/web-user-ui'
import { Button, Group } from '@mantine/core'

export function UserDetailFeatureRoutes({ isAuthUser, user }: { isAuthUser: boolean; user: User }) {
  const routes: RouteObject[] = useMemo(() => {
    return [
      { index: true, element: <UserDetailPostListFeature username={user.username} /> },
      ...(isAuthUser
        ? [
            { path: 'dashboard/*', element: <AuthorPostFeature /> },
            { path: ':postId/edit/*', element: <AuthorPostEditFeature /> },
          ]
        : []),
      { path: ':postId/*', element: <UserDetailPostDetailFeature username={user.username} /> },
    ]
  }, [isAuthUser, user.username])

  return (
    <UiContainer>
      <UiGrid
        sidebar={
          <UserUiProfile
            user={user}
            action={
              isAuthUser ? (
                <Group>
                  <Button size="xs" variant="light" component={Link} to={`${user.profileUrl}/dashboard`}>
                    Creator Dashboard
                  </Button>
                  <Button size="xs" variant="light" component={Link} to={`/settings`}>
                    Edit profile
                  </Button>
                </Group>
              ) : null
            }
          />
        }
      >
        {useRoutes(routes)}
      </UiGrid>
    </UiContainer>
  )
}
