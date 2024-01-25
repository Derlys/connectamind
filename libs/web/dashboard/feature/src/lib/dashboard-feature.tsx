import { useAuth } from '@connectamind/web-auth-data-access'
import { UiContainer } from '@pubkey-ui/core'

export default function DashboardFeature() {
  const { user } = useAuth()

  if (!user) return null

  return <UiContainer>WE NO LONGER USE THIS DASHBOARD IN FAVOR OF THE PUBLISHED POSTS VIEW</UiContainer>
}
