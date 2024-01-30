import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@connectamind/web-ui-core'
import { useAdminFindManyPost } from '@connectamind/web-post-data-access'
import { AdminPostUiTable } from '@connectamind/web-post-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@connectamind/web-ui-core'
import { Link } from 'react-router-dom'

export function AdminPostListFeature() {
  const { deletePost, items, pagination, query, setSearch } = useAdminFindManyPost()

  return (
    <UiPage
      title="Posts"
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
        <AdminPostUiTable
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
