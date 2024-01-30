import { useAuth } from '@connectamind/web-auth-data-access'
import { useUserFineOneUser } from '@connectamind/web-user-data-access'
import { UiInfo, UiLoader, UiStack, UiWarning } from '@connectamind/web-ui-core'
import { useUserFindManyPublishedPost } from '@connectamind/web-post-data-access'
import { PostUiGrid } from '@connectamind/web-post-ui'
import { IconBook, IconUserSearch } from '@tabler/icons-react'
import { UiSearchField } from '@connectamind/web-ui-core'

export function UserDetailPostListFeature({ username }: { username: string }) {
  const { user: authUser } = useAuth()
  const { user, query } = useUserFineOneUser({ username })
  const { items, pagination, setSearch } = useUserFindManyPublishedPost({ username })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found" />
  }

  // const isAuthUser = authUser?.id === user.id

  return (
    <UiStack>
      <UiSearchField size="lg" leftSection={<IconBook />} placeholder="Search post" setSearch={setSearch} />
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <PostUiGrid
          posts={items ?? []}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No posts found" />
      )}
    </UiStack>
  )
}
