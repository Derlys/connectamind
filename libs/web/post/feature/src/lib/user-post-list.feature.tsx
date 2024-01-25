import { Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@connectamind/web-ui-core'
import { useUserFindManyPublishedPost } from '@connectamind/web-post-data-access'
import { PostUiGrid } from '@connectamind/web-post-ui'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'

export function UserPostListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyPublishedPost()

  return (
    <UiPage title="Published Posts">
      <Group>
        <UiSearchField size="lg" placeholder="Search post" setSearch={setSearch} />
        <UiPageLimit size="lg" limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <PostUiGrid
          posts={items}
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
    </UiPage>
  )
}
