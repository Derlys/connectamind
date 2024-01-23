import { useAuth } from '@connectamind/web-auth-data-access'
import { UiContainer, UiDashboardGrid, UiDashboardItem } from '@pubkey-ui/core'
import { IconBook, IconCurrencySolana, IconSettings, IconUser } from '@tabler/icons-react'
import { UserPublishedPostListFeature } from './user-published-post-list.feature'

const links: UiDashboardItem[] = [
  // User Dashboard Links
  { label: 'Profile', icon: IconUser, to: '/profile' },
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Solana', icon: IconCurrencySolana, to: '/solana' },
  { label: 'Posts', icon: IconBook, to: '/posts' },
]

export default function DashboardFeature() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <UiContainer>
      <UiDashboardGrid links={links} />
      <UserPublishedPostListFeature />
    </UiContainer>
  )
}
