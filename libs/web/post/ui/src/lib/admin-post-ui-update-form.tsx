import { Button, Group } from '@mantine/core'
import { AdminUpdatePostInput, Post } from '@connectamind/sdk'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminPostUiUpdateForm({
  submit,
  post,
}: {
  submit: (res: AdminUpdatePostInput) => Promise<boolean>
  post: Post
}) {
  const model: AdminUpdatePostInput = {
    title: post.title ?? '',
    content: post.content ?? '',
  }

  const fields: UiFormField<AdminUpdatePostInput>[] = [
    formFieldText('title', { label: 'Title' }),
    formFieldTextarea('content', { label: 'Content' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdatePostInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
