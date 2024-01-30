import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@connectamind/web-ui-core'
import { useAdminFindOnePayment } from '@connectamind/web-payment-data-access'
import { useParams } from 'react-router-dom'
import { AdminPaymentDetailOverviewTab } from './admin-payment-detail-overview.tab'

export function AdminPaymentDetailFeature() {
  const { paymentId } = useParams<{ paymentId: string }>() as { paymentId: string }
  const { item, query } = useAdminFindOnePayment({ paymentId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Payment not found." />
  }

  return (
    <UiPage
      title={<Group>{item.signature}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'overview',
            label: 'Overview',
            element: <AdminPaymentDetailOverviewTab paymentId={paymentId} />,
          },
        ]}
      />
    </UiPage>
  )
}
