import { Post } from '@connectamind/sdk'
import { Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps, UiDebugModal, UiGroup, UiInfo, UiStack, UiTime } from '@pubkey-ui/core'
import { UserUiItem } from '@connectamind/web-user-ui'

export function PostUiItem({
  anchorProps,
  groupProps,
  post,
  to,
}: {
  anchorProps?: UiAnchorProps
  groupProps?: GroupProps
  post?: Post
  to?: string | null
}) {
  if (!post) return null

  return (
    <UiStack>
      <UiGroup>
        {post.author ? <UserUiItem user={post.author} to={post.author.profileUrl} /> : <div />}
        <UiDebugModal data={post} />
      </UiGroup>
      <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
        <Group gap="sm" {...groupProps}>
          <Stack gap={1}>
            <Text size="xl" fw="bold">
              {post?.title}
            </Text>
            {post.createdAt ? <UiTime size="xs" c="dimmed" date={new Date(post.createdAt)} /> : null}
          </Stack>
        </Group>
      </UiAnchor>
      {/*<UiInfo message={'POST CONTENT HERE'} />*/}
    </UiStack>
  )
}
