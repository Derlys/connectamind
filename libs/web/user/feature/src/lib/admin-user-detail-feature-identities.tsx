import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAdminFindManyIdentity } from '@connectamind/web-identity-data-access'
import { AdminIdentityUiTable, AuthUiIdentityCreateForm } from '@connectamind/web-identity-ui'
import { UiInfo, UiLoader, UiStack } from '@connectamind/web-ui-core'

export function AdminUserDetailFeatureIdentities({ userId }: { userId: string }) {
  const { items, createIdentity, deleteIdentity, query } = useAdminFindManyIdentity({ ownerId: userId })

  if (query.isLoading) return <UiLoader />

  return (
    <UiStack>
      {items?.length ? (
        <AdminIdentityUiTable identities={items ?? []} deleteIdentity={deleteIdentity} />
      ) : (
        <UiInfo message="No identities found" />
      )}
      <Group justify="right">
        <Button
          onClick={() => {
            modals.open({
              title: 'Add Identity',
              children: <AuthUiIdentityCreateForm submit={createIdentity} />,
            })
          }}
        >
          Add Identity
        </Button>
      </Group>
    </UiStack>
  )
}
