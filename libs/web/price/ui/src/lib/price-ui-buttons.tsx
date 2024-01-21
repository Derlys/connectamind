import { Price, Token } from '@connectamind/sdk'
import { Button, Group } from '@mantine/core'

export function PriceUiButtons({ prices, onClick }: { prices: Price[] | null; onClick: (price: Price) => void }) {
  return (
    <Group>
      {prices?.map((price) => {
        return (
          <Button key={price.id} onClick={() => onClick(price)} disabled={price.token !== Token.Sol}>
            {price.token} {price.amount}
          </Button>
        )
      })}
    </Group>
  )
}
