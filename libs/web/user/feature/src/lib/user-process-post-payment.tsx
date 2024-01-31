import { Post } from '@connectamind/sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import { useProcessPayment } from '@connectamind/web-user-data-access'
import { UiInfo, UiPage, UiStack, UiSuccess, UiWarning } from '@connectamind/web-ui-core'
import { PriceUiButtons } from '@connectamind/web-price-ui'
import { PublicKey } from '@solana/web3.js'
import { Group, Stack, Text } from '@mantine/core'
import { WalletButton } from '@connectamind/web-solana-ui'
import { IconCurrencySolana } from '@tabler/icons-react'

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
  ) : (
    <UiStack>
      <UiInfo title="Payment required" message="You need to buy this post to see the content." />
      {publicKey ? (
        <UiStack align="center">
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
        <UiStack align="center">
          <Text size="xl" fw="bold">
            Connect your wallet to buy this content!
          </Text>
          <WalletButton size="xl" leftSection={<IconCurrencySolana size={32} />} />
        </UiStack>
      )}
    </UiStack>
  )
}
