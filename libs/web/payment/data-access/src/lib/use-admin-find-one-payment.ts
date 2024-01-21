import { useSdk } from '@connectamind/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOnePayment({ paymentId }: { paymentId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-payment', paymentId],
    queryFn: () => sdk.adminFindOnePayment({ paymentId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
