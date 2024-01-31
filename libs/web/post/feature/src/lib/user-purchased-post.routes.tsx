import { useUserFindManyPurchasedPost } from '@connectamind/web-post-data-access'
import { UiInfo, UiLoader, UiPage, UiPageLimit, UiSearchField } from '@connectamind/web-ui-core'
import { Group } from '@mantine/core'
import { PostUiGrid } from '@connectamind/web-post-ui'

export default function UserPurchasedPostRoutes() {
  const { items, pagination, query, setSearch } = useUserFindManyPurchasedPost()

  return (
    <UiPage title="Purchased Posts">
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
