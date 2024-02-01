import { Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  SolanaUiAccountBalanceButton,
  SolanaUiAccountChecker,
  SolanaUiClusterChecker,
  SolanaUiClusterSelect,
  WalletIcon,
} from '@connectamind/web-solana-ui'
import { UiHeaderProfile } from '@connectamind/web-ui-core'
import { UiHeader, UiLayout, UiLoader } from '@connectamind/web-ui-core'
import { ReactNode, Suspense } from 'react'
import { useAuth } from '@connectamind/web-auth-data-access'

export function ShellLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure(false)
  const { user } = useAuth()
  return (
    <UiLayout
      header={
        <UiHeader
          opened={opened}
          toggle={toggle}
          links={[
            { link: '/home', label: 'Home' },
            { link: '/purchased', label: 'Purchased' },
            { link: `${user?.profileUrl}/dashboard`, label: 'Creator Dashboard' },
          ]}
          profile={
            <Group gap="xs">
              <SolanaUiAccountBalanceButton />
              <SolanaUiClusterSelect />
              <WalletIcon />
              <UiHeaderProfile />
            </Group>
          }
        />
      }
    >
      <SolanaUiClusterChecker>
        <SolanaUiAccountChecker />
      </SolanaUiClusterChecker>
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </UiLayout>
  )
}
