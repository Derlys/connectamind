import { Post } from '@connectamind/sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import { useProcessPayment } from '@connectamind/web-user-data-access'
import { UiPage, UiStack, UiSuccess, UiWarning } from '@connectamind/web-ui-core'
import { PriceUiButtons } from '@connectamind/web-price-ui'
import { PublicKey } from '@solana/web3.js'
import { Group } from '@mantine/core'
import { WalletButton } from '@connectamind/web-solana-ui'

export function UserProcessPostPayment({
  destination,
  post,
  refresh,
}: {
  destination: string
  post: Post
  refresh: () => void
}) {
  const { publicKey } = useWallet()

  const processPayment = useProcessPayment({
    source: publicKey!,
    refresh,
  })

  return post.payment ? (
    <UiSuccess message={'You bought this post'} />
  ) : publicKey ? (
    <UiStack>
      <UiWarning message={'You need to buy this post to see its content'} />
      <PriceUiButtons
        prices={post.prices ?? []}
        onClick={(price) =>
          processPayment({
            postId: post.id,
            price,
            destination: new PublicKey(destination),
          })
        }
      />
    </UiStack>
  ) : (
    <UiPage title="Connect your wallet to continue">
      <Group justify="center">
        <WalletButton size="xl" />
      </Group>
    </UiPage>
  )
}
