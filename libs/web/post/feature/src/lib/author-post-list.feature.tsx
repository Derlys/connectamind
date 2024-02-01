import { Button, Group } from '@mantine/core'
import {
  UiCardTitle,
  UiDebugModal,
  UiGroup,
  UiInfo,
  UiLoader,
  UiPageLimit,
  UiSearchField,
  UiStack,
} from '@connectamind/web-ui-core'
import { useUserFindManyAuthoredPost } from '@connectamind/web-post-data-access'
import { AuthorPostUiTable } from '@connectamind/web-post-ui'
import { Link } from 'react-router-dom'

export function AuthorPostListFeature() {
  const { deletePost, items, pagination, query, setSearch } = useUserFindManyAuthoredPost()

  return (
    <UiStack>
      <UiStack>
        <UiGroup>
          <UiCardTitle>Creator Dashboard</UiCardTitle>
          <Group>
            <UiDebugModal data={items} />
            <Button component={Link} to="create" size="xs">
              Create
            </Button>
          </Group>
        </UiGroup>

        <UiInfo
          title="About the Creator Dashboard"
          message="Here is where the creator manages theird content that others can buy."
        />

        <Group>
          <UiSearchField size="lg" placeholder="Search created posts" setSearch={setSearch} />
          <UiPageLimit size="lg" limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
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
      </UiStack>
    </UiStack>
  )
}
