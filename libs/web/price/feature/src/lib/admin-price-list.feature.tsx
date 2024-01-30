import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@connectamind/web-ui-core'
import { useAdminFindManyPrice } from '@connectamind/web-price-data-access'
import { AdminPriceUiTable } from '@connectamind/web-price-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage, UiStack } from '@connectamind/web-ui-core'
import { Link } from 'react-router-dom'

export function AdminPriceListFeature({ postId }: { postId: string }) {
  const { deletePrice, items, pagination, query, setSearch } = useAdminFindManyPrice({ postId })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search price" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />

        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminPriceUiTable
          deletePrice={(price) => {
            if (!window.confirm('Are you sure?')) return
            return deletePrice(price.id)
          }}
          prices={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No prices found" />
      )}
    </UiStack>
  )
}
