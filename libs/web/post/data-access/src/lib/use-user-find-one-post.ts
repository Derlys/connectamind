import { UserCreatePriceInput, UserUpdatePostInput, UserUpdatePriceInput } from '@connectamind/sdk'
import { useSdk } from '@connectamind/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOnePost({ postId }: { postId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-post', postId],
    queryFn: () => sdk.userFindOnePost({ postId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    createPrice: async (input: UserCreatePriceInput) =>
      sdk
        .userCreatePrice({ input: { ...input, postId } })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Price created')
            await query.refetch()
            return true
          }
          toastError('Error creating price')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deletePrice: async (priceId: string) =>
      sdk
        .userDeletePrice({ priceId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Price deleted')
            await query.refetch()
            return true
          }
          toastError('Error deleting price')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    updatePost: async (input: UserUpdatePostInput) =>
      sdk
        .userUpdatePost({ postId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Post updated')
            await query.refetch()
            return true
          }
          toastError('Post not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    updatePrice: async (priceId: string, input: UserUpdatePriceInput) =>
      sdk
        .userUpdatePrice({ priceId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Price updated')
            await query.refetch()
            return true
          }
          toastError('Price not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
