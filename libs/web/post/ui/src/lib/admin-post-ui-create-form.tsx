import { Button, Group } from '@mantine/core'
import { AdminCreatePostInput } from '@connectamind/sdk'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@connectamind/web-ui-core'

export function AdminPostUiCreateForm({ submit }: { submit: (res: AdminCreatePostInput) => Promise<boolean> }) {
  const model: AdminCreatePostInput = {
    title: '',
    content: '',
  }

  const fields: UiFormField<AdminCreatePostInput>[] = [
    formFieldText('title', { label: 'Title', required: true }),
    formFieldTextarea('content', { label: 'Content', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreatePostInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
