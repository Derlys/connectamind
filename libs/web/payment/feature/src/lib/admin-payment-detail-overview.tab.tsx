import { useAdminFindOnePayment } from '@connectamind/web-payment-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@connectamind/web-ui-core'

export function AdminPaymentDetailOverviewTab({ paymentId }: { paymentId: string }) {
  const { item, query } = useAdminFindOnePayment({ paymentId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Payment not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
