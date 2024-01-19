import { AdminCreatePriceInput } from '@connectamind/sdk'
import { useAdminFindManyPrice } from '@connectamind/web-price-data-access'
import { AdminPriceUiCreateForm } from '@connectamind/web-price-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminPriceCreateFeature({ postId }: { postId: string }) {
  const navigate = useNavigate()
  const { createPrice } = useAdminFindManyPrice({ postId })

  async function submit(input: AdminCreatePriceInput) {
    return createPrice(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/posts/${postId}/prices/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Price">
      <UiCard>
        <AdminPriceUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
