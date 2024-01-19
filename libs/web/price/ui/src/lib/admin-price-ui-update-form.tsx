import { Button, Group } from '@mantine/core'
import { AdminUpdatePriceInput, Price } from '@connectamind/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminPriceUiUpdateForm({
  submit,
  price,
}: {
  submit: (res: AdminUpdatePriceInput) => Promise<boolean>
  price: Price
}) {
  const model: AdminUpdatePriceInput = {
    token: price.token ?? '',
  }

  const fields: UiFormField<AdminUpdatePriceInput>[] = [formFieldText('token', { label: 'Token' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdatePriceInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
