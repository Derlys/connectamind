import { Badge } from '@mantine/core'
import { UserRole } from '@connectamind/sdk'
import { useUiColorScheme } from '@connectamind/web-ui-core'

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.Admin]: 'pink',
  [UserRole.User]: 'blue',
}

export function UserUiRoleBadge({ role }: { role: UserRole }) {
  const { colorScheme } = useUiColorScheme()
  return (
    <Badge color={USER_ROLE_COLORS[role]} variant={colorScheme === 'dark' ? 'light' : 'outline'}>
      {role}
    </Badge>
  )
}
