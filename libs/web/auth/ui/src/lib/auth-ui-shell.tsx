import { Button } from '@mantine/core'
import type { AppConfig, User } from '@pubkey-stack/sdk'
import { IdentityUiLoginButtons } from '@pubkey-stack/web-identity-ui'
import { UserUiAvatar } from '@pubkey-stack/web-user-ui'
import { UiStack } from '@pubkey-ui/core'
import { IconDoorExit } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { AuthUiPage } from './auth-ui-page'

export function AuthUiShell({
  appConfig,
  children,
  loading,
  logout,
  navigate,
  refresh,
  user,
}: {
  appConfig: AppConfig
  children: ReactNode
  loading: boolean
  logout: () => Promise<boolean | undefined>
  navigate: () => void
  refresh: () => Promise<boolean>
  user?: User
}) {
  return (
    <AuthUiPage appConfig={appConfig}>
      {user ? (
        <UiStack>
          <Button
            radius="md"
            size="xl"
            disabled={loading}
            fullWidth
            onClick={navigate}
            leftSection={<UserUiAvatar user={user} size={28} />}
          >
            Continue as {user.username}
          </Button>
          <Button
            radius="md"
            size="xl"
            disabled={loading}
            fullWidth
            variant="light"
            onClick={logout}
            leftSection={<IconDoorExit size={28} />}
          >
            Logout {user.username}
          </Button>
        </UiStack>
      ) : (
        <UiStack>
          <IdentityUiLoginButtons mb="md" mt="md" appConfig={appConfig} refresh={refresh} />
          {children}
        </UiStack>
      )}
    </AuthUiPage>
  )
}