import { Group } from '@mantine/core'
import {
  toastError,
  UiBack,
  UiDebug,
  UiDebugModal,
  UiError,
  UiLoader,
  UiPage,
  UiStack,
  UiSuccess,
  UiWarning,
} from '@pubkey-ui/core'
import { useUserFindOnePost } from '@connectamind/web-post-data-access'
import { useParams } from 'react-router-dom'
import { UserPostUiUpdateForm } from '@connectamind/web-post-ui'
import { PriceUiButtons } from '@connectamind/web-price-ui'
import { Price, Token } from '@connectamind/sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '@connectamind/web-solana-ui'
import { useTransferSol } from '@connectamind/web-solana-data-access'
import { PublicKey } from '@solana/web3.js'
import { useUserFindManyPayment } from '@connectamind/web-payment-data-access'

export function UserPostDetailFeature() {
  const { postId } = useParams<{ postId: string }>() as { postId: string }
  const { publicKey } = useWallet()
  const { item, query, updatePost } = useUserFindOnePost({ postId })
  const { createPayment } = useUserFindManyPayment()
  const mutation = useTransferSol({ address: publicKey! })

  const destination = item?.author?.publicKey ?? undefined

  function processPayment(price: Price) {
    if (!publicKey || !destination) {
      return
    }
    console.log(price)
    switch (price.token) {
      case Token.Sol:
        mutation
          .mutateAsync({
            destination: new PublicKey(destination),
            amount: price.amount,
          })
          .then((signature) => {
            if (!signature) {
              return
            }
            //
            console.log(signature)
            return createPayment({ postId, signature, priceId: price.id })
          })
          .then(() => {
            //
            return query.refetch()
          })
          .catch((err) => {
            toastError(`error sending ${price.token}`)
          })

        break
      default:
        toastError(`Can't send ${price.token}`)
    }
  }

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Post not found." />
  }

  return (
    <UiPage
      title={<Group>{item.title}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      {item.payment ? (
        <UiSuccess message={'You bought this post'} />
      ) : publicKey ? (
        <UiStack>
          <UiWarning message={'You need to buy this post to see its content'} />
          <PriceUiButtons prices={item.prices ?? []} onClick={processPayment} />
        </UiStack>
      ) : (
        <UiPage title="Connect your wallet to continue">
          <Group justify="center">
            <WalletButton size="xl" />
          </Group>
        </UiPage>
      )}
      {item.content ? <div>content:{item.content}</div> : null}
      <UiDebug data={item} />
      <UserPostUiUpdateForm submit={updatePost} post={item} />
    </UiPage>
  )
}
