import { AdminFindManyPaymentInput } from '@connectamind/sdk'
import { useSdk } from '@connectamind/web-core-data-access'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyPayment(props?: Partial<AdminFindManyPaymentInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyPaymentInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-payment', input],
    queryFn: () => sdk.adminFindManyPayment({ input }).then((res) => res.data),
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

    deletePayment: (paymentId: string) =>
      sdk.adminDeletePayment({ paymentId }).then(() => {
        toastSuccess('Payment deleted')
        return query.refetch()
      }),
  }
}
