import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@connectamind/web-ui-core'
import { useAdminFindManyPayment } from '@connectamind/web-payment-data-access'
import { AdminPaymentUiTable } from '@connectamind/web-payment-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminPaymentListFeature() {
  const { deletePayment, items, pagination, query, setSearch } = useAdminFindManyPayment()

  return (
    <UiPage
      title="Payments"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search payment" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminPaymentUiTable
          deletePayment={(payment) => {
            if (!window.confirm('Are you sure?')) return
            return deletePayment(payment.id)
          }}
          payments={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No payments found" />
      )}
    </UiPage>
  )
}
