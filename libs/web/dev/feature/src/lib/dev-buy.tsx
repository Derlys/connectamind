import { toastError, toastSuccess, UiCard, UiInfo, UiPage, UiStack } from '@pubkey-ui/core'
import { Button, Code, Group } from '@mantine/core'
import { Price, Token } from '@connectamind/sdk'
import { PriceUiButtons } from '@connectamind/web-price-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '@connectamind/web-solana-ui'
import { useTransferSol } from '@connectamind/web-solana-data-access'
import { PublicKey } from '@solana/web3.js'

export function DevBuy() {
  const { publicKey } = useWallet()

  if (!publicKey)
    return (
      <UiPage title="Connect your wallet to continue">
        <Group justify="center">
          <WalletButton size="xl" />
        </Group>
      </UiPage>
    )

  return <DevBuyWallet address={publicKey} />
}

export function DevBuyWallet({ address }: { address: PublicKey }) {
  const mutation = useTransferSol({ address })

  const destination = '6XpqXP4Jx7YARWkaSt4FgR141F6bUdudQQ7XPBY3xHtX'

  function handlePayment(token: Token, amount: string, destination: string) {
    switch (token) {
      case Token.Sol:
        mutation
          .mutateAsync({
            destination: new PublicKey(destination),
            amount,
          })
          .then((tx) => {
            //
            console.log(tx)
          })
          .catch((err) => {
            toastError(`error sending ${token}`)
          })

        break
      default:
        toastError(`Can't send ${token}`)
    }
  }

  const prices: Price[] = [
    //
    { amount: '0.1', token: Token.Sol, id: '1', postId: '' },
    { amount: '0.1', token: Token.Bonk, id: '2', postId: '' },
  ]
  return (
    <UiCard title="Buy">
      <UiStack>
        <PriceUiButtons
          prices={prices}
          onClick={(price) => {
            handlePayment(price.token, price.amount, destination)
          }}
        />
      </UiStack>
    </UiCard>
  )
}
