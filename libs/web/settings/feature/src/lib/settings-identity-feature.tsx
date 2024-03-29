import { useAuth } from '@connectamind/web-auth-data-access'
import { useUserFindManyIdentity } from '@connectamind/web-identity-data-access'
import { IdentityUiGroupList } from '@connectamind/web-identity-ui'
import { UiLoader, UiStack } from '@connectamind/web-ui-core'

export function SettingsIdentityFeature() {
  const { user } = useAuth()
  const { deleteIdentity, grouped, query } = useUserFindManyIdentity({ username: user?.username as string })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <IdentityUiGroupList grouped={grouped} deleteIdentity={deleteIdentity} refresh={() => query.refetch()} />
      )}
    </UiStack>
  )
}
