import { Group } from '@mantine/core'
import { UiBack, UiCard, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useUserFindOnePost } from '@connectamind/web-post-data-access'
import { useParams } from 'react-router-dom'
import { UserPostUiUpdateForm } from '@connectamind/web-post-ui'
import { useAuth } from '@connectamind/web-auth-data-access'
import { UserPostManagePricesFeature } from './user-post-manage-prices.feature'

export function UserPostEditFeature() {
  const { user } = useAuth()
  const { postId } = useParams<{ postId: string }>() as { postId: string }
  const { item, query, updatePost } = useUserFindOnePost({ postId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Post not found." />
  }
  if (item.authorId !== user?.id) {
    return <UiError message={'You are not the author'} />
  }

  return (
    <UiPage
      title={<Group>edit:{item.title}</Group>}
      leftAction={<UiBack to={`/posts/${item.id}`} />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'content',
            label: 'Content',
            element: (
              <UiCard>
                <UserPostUiUpdateForm submit={updatePost} post={item} />
              </UiCard>
            ),
          },
          {
            path: 'prices',
            label: 'Prices',
            element: (
              <UiCard>
                <UserPostManagePricesFeature post={item} />
              </UiCard>
            ),
          },
        ]}
      />
    </UiPage>
  )
}
