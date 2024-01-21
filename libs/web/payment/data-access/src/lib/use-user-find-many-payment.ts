import { UserCreatePaymentInput, UserFindManyPaymentInput } from '@connectamind/sdk'
import { useSdk } from '@connectamind/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyPayment(props?: Partial<UserFindManyPaymentInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyPaymentInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['user', 'find-many-payment', input],
    queryFn: () => sdk.userFindManyPayment({ input }).then((res) => res.data),
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
    createPayment: (input: UserCreatePaymentInput) =>
      sdk
        .userCreatePayment({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Payment created`)
          } else {
            toastError(`Payment not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
  }
}
