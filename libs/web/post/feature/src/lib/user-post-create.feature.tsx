import { UserCreatePostInput } from '@connectamind/sdk'
import { useUserFindManyPost } from '@connectamind/web-post-data-access'
import { UserPostUiCreateForm } from '@connectamind/web-post-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserPostCreateFeature() {
  const navigate = useNavigate()
  const { createPost } = useUserFindManyPost()

  async function submit(input: UserCreatePostInput) {
    return createPost(input)
      .then((res) => {
        if (res) {
          navigate(`/posts/${res?.id}`)
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
        <UserPostUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
