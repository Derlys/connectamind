import { Link, useParams } from 'react-router-dom'
import { useUserFindOnePost } from '@connectamind/web-post-data-access'
import {
  UiBack,
  UiCard,
  UiCardTitle,
  UiDebugModal,
  UiError,
  UiGroup,
  UiLoader,
  UiStack,
  UiWarning,
} from '@pubkey-ui/core'
import { useAuth } from '@connectamind/web-auth-data-access'
import { Button, Group } from '@mantine/core'
import { useMemo } from 'react'
import { UserProcessPostPayment } from './user-process-post-payment'
import { PostUiItem } from '@connectamind/web-post-ui'

export function UserDetailPostDetailFeature({ username }: { username: string }) {
  const { user } = useAuth()
  const { postId } = useParams() as { postId: string }
  const { item, query } = useUserFindOnePost({ postId })

  const destination = useMemo(() => item?.author?.publicKey ?? undefined, [item?.author])

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item || !item.author) {
    return <UiError message="Post not found." />
  }
  if (!destination) {
    return <UiWarning message={'Author does not have their wallet configured'} />
  }

  const userIsAuthor = item.authorId === user?.id

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack to={item.author.profileUrl ?? ''} />
          <UiCardTitle>Back to Posts</UiCardTitle>
        </Group>
        <Group>
          <UiDebugModal data={item} />
          {userIsAuthor ? (
            <Button component={Link} to={'./edit'}>
              Edit
            </Button>
          ) : null}
        </Group>
      </UiGroup>

      <UiCard>
        <PostUiItem post={item} />

        {item.content ? <pre>{item.content}</pre> : null}
      </UiCard>

      {!userIsAuthor ? (
        <UiCard>
          <UserProcessPostPayment destination={destination} post={item} refresh={() => query.refetch()} />
        </UiCard>
      ) : null}
    </UiStack>
  )
}
