import { Group } from '@mantine/core'
import { UiBack, UiDebug, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useUserFindOnePost } from '@connectamind/web-post-data-access'
import { useParams } from 'react-router-dom'
import { UserPostUiUpdateForm } from '@connectamind/web-post-ui'
import { PriceUiButtons } from '@connectamind/web-price-ui'

export function UserPostDetailFeature() {
  const { postId } = useParams<{ postId: string }>() as { postId: string }
  const { item, query, updatePost } = useUserFindOnePost({ postId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Post not found." />
  }

  return (
    <UiPage
      title={<Group>{item.title}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <PriceUiButtons
        prices={item.prices}
        onClick={({ token, amount }) => {
          console.log({ token, amount })
        }}
      />
      <UiDebug data={item} open />
      <UserPostUiUpdateForm submit={updatePost} post={item} />
    </UiPage>
  )
}
