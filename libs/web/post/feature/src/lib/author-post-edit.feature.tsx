import { Group } from '@mantine/core'
import {
  UiBack,
  UiCard,
  UiCardTitle,
  UiDebugModal,
  UiError,
  UiGroup,
  UiLoader,
  UiStack,
  UiSuccess,
  UiTabRoutes,
  UiWarning,
} from '@connectamind/web-ui-core'
import { useUserFindOnePost } from '@connectamind/web-post-data-access'
import { useParams } from 'react-router-dom'
import { UserPostUiUpdateForm } from '@connectamind/web-post-ui'
import { useAuth } from '@connectamind/web-auth-data-access'
import { AuthorPostManagePricesFeature } from './author-post-manage-prices.feature'

export function AuthorPostEditFeature() {
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
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack to={item.postUrl} />
          <UiCardTitle>edit:{item.title}</UiCardTitle>
        </Group>
        <Group>
          <UiDebugModal data={item} />
        </Group>
      </UiGroup>
      {item.prices?.length ? (
        <UiSuccess message={'Your post is published'} />
      ) : (
        <UiWarning title="Pusblish your post" message="Add at least one price to monetize your content." />
      )}
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
                <AuthorPostManagePricesFeature post={item} />
              </UiCard>
            ),
          },
        ]}
      />
    </UiStack>
  )
}
