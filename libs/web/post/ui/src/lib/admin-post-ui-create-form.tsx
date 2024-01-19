import { Button, Group } from '@mantine/core'
import { AdminCreatePostInput } from '@connectamind/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function AdminPostUiCreateForm({ submit }: { submit: (res: AdminCreatePostInput) => Promise<boolean> }) {
  const model: AdminCreatePostInput = {
    title: '',
  }

  const fields: UiFormField<AdminCreatePostInput>[] = [formFieldText('title', { label: 'Title', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreatePostInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
