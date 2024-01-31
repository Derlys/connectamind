import { useUserFindManyPurchasedPost } from '@connectamind/web-post-data-access'
import { UiInfo, UiLoader, UiPage, UiPageLimit, UiSearchField, UiStack } from '@connectamind/web-ui-core'
import { Group } from '@mantine/core'
import { PostUiGrid } from '@connectamind/web-post-ui'

export default function UserPurchasedPostRoutes() {
  const { items, pagination, query, setSearch } = useUserFindManyPurchasedPost()

  return (
    <UiPage title="Purchased Posts">
      <UiStack>
        <UiInfo
          title="About Purchased Posts"
          message="Here you can find the content that you purchased from other creators."
        />
        <Group>
          <UiSearchField size="lg" placeholder="Search purchased posts" setSearch={setSearch} />
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
      </UiStack>
    </UiPage>
  )
}
