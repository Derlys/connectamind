import { useAdminFindOnePrice } from '@connectamind/web-price-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminPriceDetailOverviewTab({ priceId }: { priceId: string }) {
  const { item, query } = useAdminFindOnePrice({ priceId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Price not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
