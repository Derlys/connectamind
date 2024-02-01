import { UserCreatePostInput } from '@connectamind/sdk'
import { useUserFindManyAuthoredPost } from '@connectamind/web-post-data-access'
import { UserPostUiCreateForm } from '@connectamind/web-post-ui'
import { toastError, UiBack, UiCard, UiCardTitle, UiGroup, UiStack } from '@connectamind/web-ui-core'
import { useNavigate } from 'react-router-dom'
import { Group } from '@mantine/core'

export function AuthorPostCreateFeature() {
  const navigate = useNavigate()
  const { createPost } = useUserFindManyAuthoredPost()

  async function submit(input: UserCreatePostInput) {
    return createPost(input)
      .then((res) => {
        if (res) {
          navigate(`${res?.postUrl}/edit`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <UiBack />
          <UiCardTitle>Create Post</UiCardTitle>
        </Group>
      </UiGroup>

      <UiCard>
        <UserPostUiCreateForm submit={submit} />
      </UiCard>
    </UiStack>
  )
}
