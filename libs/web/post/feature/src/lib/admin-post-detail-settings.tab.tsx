import { useAdminFindOnePost } from '@connectamind/web-post-data-access'
import { AdminPostUiUpdateForm } from '@connectamind/web-post-ui'
import { UiCard, UiError, UiLoader } from '@connectamind/web-ui-core'

export function AdminPostDetailSettingsTab({ postId }: { postId: string }) {
  const { item, query, updatePost } = useAdminFindOnePost({ postId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Post not found." />
  }

  return (
    <UiCard>
      <AdminPostUiUpdateForm post={item} submit={updatePost} />
    </UiCard>
  )
}
