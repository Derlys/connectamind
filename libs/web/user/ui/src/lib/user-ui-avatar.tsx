import { Avatar, AvatarProps, Tooltip } from '@mantine/core'
import { getRandomInt, User } from '@connectamind/sdk'
import { getColorByIndex } from '@connectamind/web-ui-core'

export type UserUiAvatarProps = Omit<AvatarProps, 'src'> & {
  user?: User
  tooltipLabel?: string
}

export function UserUiAvatar({ user, tooltipLabel, ...props }: UserUiAvatarProps) {
  const firstLetter = user?.username?.charAt(0) ?? '?'

  const content = user?.avatarUrl?.length ? (
    <Avatar radius={100} src={user.avatarUrl} alt={`User ${user.username} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color={getColorByIndex(getRandomInt(user?.username ?? ''))} {...props}>
      {firstLetter?.toUpperCase()}
    </Avatar>
  )

  return tooltipLabel ? (
    <Tooltip label={tooltipLabel} withArrow>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
