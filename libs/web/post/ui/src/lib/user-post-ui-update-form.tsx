import { Button, Group } from '@mantine/core'
import { UserUpdatePostInput, Post } from '@connectamind/sdk'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@connectamind/web-ui-core'

export function UserPostUiUpdateForm({
  submit,
  post,
}: {
  submit: (res: UserUpdatePostInput) => Promise<boolean>
  post: Post
}) {
  const model: UserUpdatePostInput = {
    title: post.title ?? '',
    content: post.content ?? '',
  }

  const fields: UiFormField<UserUpdatePostInput>[] = [
    formFieldText('title', { label: 'Title' }),
    formFieldTextarea('content', { label: 'Content' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdatePostInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
