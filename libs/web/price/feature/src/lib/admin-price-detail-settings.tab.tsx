import { useAdminFindOnePrice } from '@connectamind/web-price-data-access'
import { AdminPriceUiUpdateForm } from '@connectamind/web-price-ui'
import { UiCard, UiError, UiLoader } from '@connectamind/web-ui-core'

export function AdminPriceDetailSettingsTab({ priceId }: { priceId: string }) {
  const { item, query, updatePrice } = useAdminFindOnePrice({ priceId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Price not found." />
  }

  return (
    <UiCard>
      <AdminPriceUiUpdateForm price={item} submit={updatePrice} />
    </UiCard>
  )
}
