import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@connectamind/web-ui-core'
import { useAdminFindOnePrice } from '@connectamind/web-price-data-access'
import { useParams } from 'react-router-dom'
import { AdminPriceDetailOverviewTab } from './admin-price-detail-overview.tab'
import { AdminPriceDetailSettingsTab } from './admin-price-detail-settings.tab'

export function AdminPriceDetailFeature() {
  const { priceId } = useParams<{ priceId: string }>() as { priceId: string }
  const { item, query } = useAdminFindOnePrice({ priceId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Price not found." />
  }

  return (
    <UiPage
      title={<Group>{item.token}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <AdminPriceDetailSettingsTab priceId={priceId} />
    </UiPage>
  )
}
