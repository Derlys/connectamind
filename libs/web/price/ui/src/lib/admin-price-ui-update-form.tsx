import { Button, Group } from '@mantine/core'
import { AdminUpdatePriceInput, Price } from '@connectamind/sdk'
import { formFieldText, UiForm, UiFormField } from '@connectamind/web-ui-core'

export function AdminPriceUiUpdateForm({
  submit,
  price,
}: {
  submit: (res: AdminUpdatePriceInput) => Promise<boolean>
  price: Price
}) {
  const model: AdminUpdatePriceInput = {
    amount: price.amount ?? '',
  }

  const fields: UiFormField<AdminUpdatePriceInput>[] = [formFieldText('amount', { label: 'Amount' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdatePriceInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
