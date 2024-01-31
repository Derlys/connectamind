import { Post } from '@connectamind/sdk'
import { UiCard } from '@connectamind/web-ui-core'
import { PostUiItem } from './post-ui-item'

export function PostUiGridItem({ post, to, withCta }: { post: Post; to?: string; withCta?: boolean }) {
  return (
    <UiCard withBorder p="md">
      <PostUiItem post={post} to={to} withCta={withCta} />
    </UiCard>
  )
}
