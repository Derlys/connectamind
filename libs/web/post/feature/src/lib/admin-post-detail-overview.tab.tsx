import { useAdminFindOnePost } from '@connectamind/web-post-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@connectamind/web-ui-core'

export function AdminPostDetailOverviewTab({ postId }: { postId: string }) {
  const { item, query } = useAdminFindOnePost({ postId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Post not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
