import { AdminCreatePriceInput, AdminFindManyPriceInput } from '@connectamind/sdk'
import { useSdk } from '@connectamind/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyPrice(props: Partial<AdminFindManyPriceInput> & { postId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyPriceInput = { page, limit, search, postId: props.postId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-price', input],
    queryFn: () => sdk.adminFindManyPrice({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    createPrice: (input: AdminCreatePriceInput) =>
      sdk
        .adminCreatePrice({ input: { ...input, postId: props.postId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Price created`)
          } else {
            toastError(`Price not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deletePrice: (priceId: string) =>
      sdk.adminDeletePrice({ priceId }).then(() => {
        toastSuccess('Price deleted')
        return query.refetch()
      }),
  }
}
