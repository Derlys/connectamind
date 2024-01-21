import { Button, Group } from '@mantine/core'
import { UserCreatePostInput } from '@connectamind/sdk'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserPostUiCreateForm({ submit }: { submit: (res: UserCreatePostInput) => Promise<boolean> }) {
  const model: UserCreatePostInput = {
    title: '',
    content: '',
  }

  const fields: UiFormField<UserCreatePostInput>[] = [
    formFieldText('title', { label: 'Title', required: true }),
    formFieldTextarea('content', { label: 'Content', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreatePostInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
