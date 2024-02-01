import { Post } from '@connectamind/sdk'
import { Button, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps, UiDebugModal, UiGroup, UiStack, UiTime } from '@connectamind/web-ui-core'
import { UserUiItem } from '@connectamind/web-user-ui'
import { Link } from 'react-router-dom'
import { useAuth } from '@connectamind/web-auth-data-access'

export function PostUiItem({
  anchorProps,
  groupProps,
  post,
  to,
  withCta,
}: {
  anchorProps?: UiAnchorProps
  groupProps?: GroupProps
  post?: Post
  to?: string | null
  withCta?: boolean
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
          </Stack>
        </Group>
        <UiGroup mt="xl">
          {post.createdAt ? <UiTime size="xs" c="dimmed" date={new Date(post.createdAt)} /> : null}
          {withCta ? <PostUiCta post={post} /> : null}
        </UiGroup>
      </UiAnchor>
      {/*<UiInfo message={'POST CONTENT HERE'} />*/}
    </UiStack>
  )
}

function PostUiCta({ post }: { post: Post }) {
  const { user } = useAuth()
  return user?.id === post.authorId ? (
    <Button component={Link} to={post.postUrl + '/edit'} color="blue">
      Edit Post
    </Button>
  ) : (
    <Button component={Link} to={post.postUrl} color={post.content ? 'green' : 'brand'}>
      {post.content ? 'Read Post' : 'Buy Post'}
    </Button>
  )
}
