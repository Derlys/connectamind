import { useAuth } from '@connectamind/web-auth-data-access'
import { UiContainer, UiDashboardGrid, UiDashboardItem, UiDebug } from '@pubkey-ui/core'
import { IconCurrencySolana, IconSettings, IconUser } from '@tabler/icons-react'
import { useUserFindManyPost } from '@connectamind/web-post-data-access'

const links: UiDashboardItem[] = [
  // User Dashboard Links
  { label: 'Profile', icon: IconUser, to: '/profile' },
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Solana', icon: IconCurrencySolana, to: '/solana' },
]

export default function DashboardFeature() {
  const { items } = useUserFindManyPost()
  const { user } = useAuth()

  if (!user) return null

  return (
    <UiContainer>
      <UiDashboardGrid links={links} />
      <UiDebug data={items} open />
    </UiContainer>
  )
}
