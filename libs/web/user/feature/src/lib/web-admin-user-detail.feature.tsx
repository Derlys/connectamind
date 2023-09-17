import { UiAdminPage, UiBack, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-stack/web/ui/core'
import { useAdminFindOneUser } from '@pubkey-stack/web/user/data-access'
import { useParams } from 'react-router-dom'
import { WebAdminUserDetailEmailsTab } from './web-admin-user-detail-emails.tab'
import { WebAdminUserDetailIdentitiesTab } from './web-admin-user-detail-identities.tab'
import { WebAdminUserDetailSettingsTab } from './web-admin-user-detail-settings.tab'

export function WebAdminUserDetailFeature() {
  const { userId } = useParams<{ userId: string }>() as { userId: string }
  const { query, user } = useAdminFindOneUser({ userId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!user) {
    return <UiError message="User not found" />
  }

  return (
    <UiAdminPage leftAction={<UiBack />} title={user?.username ?? '...'}>
      <UiStack>
        <UiTabRoutes
          tabs={[
            {
              value: 'settings',
              label: 'Settings',
              component: <WebAdminUserDetailSettingsTab userId={userId} />,
            },
            {
              value: 'emails',
              label: 'Emails',
              component: <WebAdminUserDetailEmailsTab userId={userId} />,
            },
            {
              value: 'identities',
              label: 'Identities',
              component: <WebAdminUserDetailIdentitiesTab userId={userId} />,
            },
          ]}
        />
      </UiStack>
    </UiAdminPage>
  )
}
