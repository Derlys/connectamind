import { Post } from '@connectamind/sdk'
import { UiCard } from '@connectamind/web-ui-core'
import { PostUiItem } from './post-ui-item'

export function PostUiGridItem({ post, to }: { post: Post; to?: string }) {
  return (
    <UiCard withBorder p="md">
      <PostUiItem post={post} to={to} />
    </UiCard>
  )
}
