import { Button, Group, TextInput } from '@mantine/core'
import { Token, UserCreatePriceInput } from '@connectamind/sdk'
import { useState } from 'react'

export function UserPriceUiCreateForm({
  submit,
  token,
}: {
  token: Token
  submit: (res: UserCreatePriceInput) => Promise<boolean>
}) {
  const [amount, setAmount] = useState('0')

  return (
    <Group align="end" gap="xs">
      <TextInput
        label={`Amount in ${token}`}
        required
        w={120}
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <Button disabled={!amount || amount === '0'} onClick={() => submit({ token, postId: '', amount })}>
        Add
      </Button>
    </Group>
  )
}
