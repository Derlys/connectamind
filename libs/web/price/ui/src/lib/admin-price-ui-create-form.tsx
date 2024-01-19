import { Button, Group } from '@mantine/core'
import { AdminCreatePriceInput, getEnumOptions, Token } from '@connectamind/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminPriceUiCreateForm({ submit }: { submit: (res: AdminCreatePriceInput) => Promise<boolean> }) {
  const model: AdminCreatePriceInput = {
    token: Token.Bonk,
    amount: '',
    postId: '',
  }

  const fields: UiFormField<AdminCreatePriceInput>[] = [
    //
    formFieldSelect('token', { label: 'Token', required: true, options: getEnumOptions(Token) }),
    formFieldText('amount', { label: 'Amount', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreatePriceInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
