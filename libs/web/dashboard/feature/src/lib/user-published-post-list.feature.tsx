import { Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@connectamind/web-ui-core'
import { useUserFindManyPublishedPost } from '@connectamind/web-post-data-access'
import { UiDebug, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'

export function UserPublishedPostListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyPublishedPost()

  return (
    <UiPage
      title="Published Posts"
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search post" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? <UiLoader /> : items?.length ? <UiDebug data={items} /> : <UiInfo message="No posts found" />}
    </UiPage>
  )
}
