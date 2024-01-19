import { Button, Group } from '@mantine/core'
import { AdminCreatePriceInput } from '@connectamind/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function AdminPriceUiCreateForm({ submit }: { submit: (res: AdminCreatePriceInput) => Promise<boolean> }) {
  const model: AdminCreatePriceInput = {
    token: '',
    postId: '',
  }

  const fields: UiFormField<AdminCreatePriceInput>[] = [formFieldText('token', { label: 'Token', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreatePriceInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
