import { Price, Token } from '@connectamind/sdk'
import { Button, Group, Tooltip } from '@mantine/core'
import { useState } from 'react'

export function PriceUiButtons({ prices, onClick }: { prices: Price[] | null; onClick: (price: Price) => void }) {
  const sorted = (prices ?? [])
    .map((i) => ({ ...i, enabled: isEnabled(i.token) }))
    .sort((a, b) => Number(b.enabled) - Number(a.enabled))

  return (
    <Group>
      {sorted?.map((price) => {
        return (
          <PriceUiButton
            token={price.token.toUpperCase()}
            amount={price.amount}
            enabled={price.enabled}
            key={price.id}
            onClick={() => onClick(price)}
          />
        )
      })}
    </Group>
  )
}
export function PriceUiButton({
  token,
  enabled,
  amount,
  onClick,
}: {
  token: string
  enabled: boolean
  amount: string
  onClick: () => void
}) {
  const [loading, setLoading] = useState(false)

  return (
    <Tooltip label={enabled ? `Pay with ${token}` : `Soon you can pay with ${token}!`}>
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true)
          onClick()
        }}
        disabled={!enabled}
        tt="uppercase"
        size="xl"
      >
        Buy with {amount} {token}
      </Button>
    </Tooltip>
  )
}

function isEnabled(token: Token) {
  switch (token) {
    case Token.Sol:
      return true
    default:
      return false
  }
}
