import { Button, Group } from '@mantine/core'
import { AdminCreateUserInput } from '@connectamind/sdk'
import { formFieldPassword, formFieldText, UiForm, UiFormField } from '@connectamind/web-ui-core'

export function AdminUiCreateUserForm({ submit }: { submit: (res: AdminCreateUserInput) => Promise<boolean> }) {
  const model: AdminCreateUserInput = {
    username: '',
    password: '',
  }

  const fields: UiFormField<AdminCreateUserInput>[] = [
    formFieldText('username', { label: 'Username', required: true }),
    formFieldPassword('password', { label: 'Password' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateUserInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
