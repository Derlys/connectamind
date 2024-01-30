import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { User } from '@connectamind/sdk'
import { UiAnchor, type UiAnchorProps } from '@connectamind/web-ui-core'
import { UserUiAvatar } from './user-ui-avatar'

export function UserUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  user,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  user?: User
  to?: string | null
}) {
  if (!user) return null
  const item = (
    <Group gap="sm" {...groupProps}>
      <UserUiAvatar user={user} {...avatarProps} />
      <Stack gap={1}>
        <Text size="sm" fw={500}>
          {user?.username}
        </Text>
        {user.name ? (
          <Text size="sm" c="dimmed">
            {user.name}
          </Text>
        ) : null}
      </Stack>
    </Group>
  )

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      {item}
    </UiAnchor>
  )
}
