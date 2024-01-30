import { AdminCreatePostInput } from '@connectamind/sdk'
import { useAdminFindManyPost } from '@connectamind/web-post-data-access'
import { AdminPostUiCreateForm } from '@connectamind/web-post-ui'
import { toastError, UiBack, UiCard, UiPage } from '@connectamind/web-ui-core'
import { useNavigate } from 'react-router-dom'

export function AdminPostCreateFeature() {
  const navigate = useNavigate()
  const { createPost } = useAdminFindManyPost()

  async function submit(input: AdminCreatePostInput) {
    return createPost(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/posts/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Post">
      <UiCard>
        <AdminPostUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
