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

export function ShellLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout
      header={
        <UiHeader
          opened={opened}
          toggle={toggle}
          links={[
            { link: '/posts', label: 'Posts' },
            { link: '/dashboard', label: 'Dashboard' },
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
