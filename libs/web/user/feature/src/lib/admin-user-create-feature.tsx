import { AdminCreateUserInput } from '@connectamind/sdk'
import { useAdminFindManyUser } from '@connectamind/web-user-data-access'
import { AdminUiCreateUserForm } from '@connectamind/web-user-ui'
import { toastError, UiBack, UiCard, UiPage } from '@connectamind/web-ui-core'
import { useNavigate } from 'react-router-dom'

export function AdminUserCreateFeature() {
  const navigate = useNavigate()
  const { createUser } = useAdminFindManyUser()

  async function submit(input: AdminCreateUserInput) {
    return createUser(input)
      .then((res) => {
        if (res?.id) {
          navigate(`/admin/users/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create User">
      <UiCard>
        <AdminUiCreateUserForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
