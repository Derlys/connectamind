import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@connectamind/web-ui-core'
import { useUserFindManyAuthoredPost } from '@connectamind/web-post-data-access'
import { AuthorPostUiTable } from '@connectamind/web-post-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@connectamind/web-ui-core'
import { Link } from 'react-router-dom'

export function AuthorPostListFeature() {
  const { deletePost, items, pagination, query, setSearch } = useUserFindManyAuthoredPost()

  return (
    <UiPage
      title="Dashboard"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search post" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AuthorPostUiTable
          deletePost={(post) => {
            if (!window.confirm('Are you sure?')) return
            return deletePost(post.id)
          }}
          posts={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No posts found" />
      )}
    </UiPage>
  )
}
