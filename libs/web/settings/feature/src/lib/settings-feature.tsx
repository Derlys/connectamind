import { Button } from '@mantine/core'
import { UiGrid } from '@pubkey-stack/web-ui-core'
import { useUserProfile } from '@pubkey-stack/web-user-data-access'
import { UserUiProfile, UserUiUpdateForm } from '@pubkey-stack/web-user-ui'
import { UiCard, UiContainer, UiLoader, UiTabRoutes, UiWarning } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { SettingsIdentityFeature } from './settings-identity-feature'

export default function SettingsFeature() {
  const { updateUser, user, query } = useUserProfile()

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found" />
  }

  return (
    <UiContainer size="lg">
      <UiGrid
        sidebar={
          <UserUiProfile
            user={user}
            action={
              <Button size="xs" variant="light" component={Link} to={`/profile`}>
                View profile
              </Button>
            }
          />
        }
      >
        <UiTabRoutes
          tabs={[
            {
              label: 'Edit Profile',
              value: 'profile',
              component: (
                <UiCard>
                  <UserUiUpdateForm user={user} submit={updateUser} />
                </UiCard>
              ),
            },
            {
              label: 'Manage Identities',
              value: 'identities',
              component: <SettingsIdentityFeature />,
            },
          ]}
        />
      </UiGrid>
    </UiContainer>
  )
}
