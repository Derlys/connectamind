import { PublicKey } from '@solana/web3.js'
import { useTransferSol } from '@connectamind/web-solana-data-access'
import { useUserFindManyPayment } from '@connectamind/web-payment-data-access'
import { Price, Token } from '@connectamind/sdk'
import { toastError } from '@connectamind/web-ui-core'

export function useProcessPayment({ source, refresh }: { source: PublicKey; refresh: () => void }) {
  const mutation = useTransferSol({ address: source })
  const { createPayment } = useUserFindManyPayment()

  return ({ postId, price, destination }: { destination: PublicKey; price: Price; postId: string }) => {
    switch (price.token) {
      case Token.Sol:
        mutation
          .mutateAsync({
            destination,
            amount: price.amount,
          })
          .then((signature) => {
            if (!signature) {
              return
            }
            return createPayment({ postId, signature, priceId: price.id })
          })
          .then(() => refresh())
          .catch((err) => {
            toastError(`error sending ${price.token}`)
          })

        break
      default:
        toastError(`Can't send ${price.token}`)
    }
  }
}
