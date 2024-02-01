import { ActionIcon, Button, Group, TextInput } from '@mantine/core'
import { Price, UserUpdatePriceInput } from '@connectamind/sdk'
import { useState } from 'react'
import { IconTrash } from '@tabler/icons-react'

export function UserPriceUiUpdateForm({
  deletePrice,
  updatePrice,
  price,
}: {
  price: Price
  deletePrice: (priceId: string) => Promise<boolean>
  updatePrice: (priceId: string, res: UserUpdatePriceInput) => Promise<boolean>
}) {
  const [amount, setAmount] = useState(price.amount)

  return (
    <Group align="end" gap="xs">
      <TextInput
        label={`Amount in ${price.token.toUpperCase()}`}
        required
        w={150}
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <Button disabled={!amount || amount === '0'} onClick={() => updatePrice(price.id, { amount })}>
        Update
      </Button>
      <Button
        leftSection={<IconTrash size={16} />}
        color="red"
        size="sm"
        variant="light"
        onClick={() => deletePrice(price.id)}
      >
        Delete
      </Button>
    </Group>
  )
}
