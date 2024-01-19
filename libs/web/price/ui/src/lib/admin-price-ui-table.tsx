import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { Price } from '@connectamind/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function AdminPriceUiTable({
  deletePrice,
  prices = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deletePrice: (price: Price) => void
  prices: Price[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'token',
            render: (item) => (
              <Anchor component={Link} to={`/admin/posts/${item.postId}/prices/${item.id}`} size="sm" fw={500}>
                {item.token}
              </Anchor>
            ),
          },
          { accessor: 'amount' },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon
                  color="brand"
                  variant="light"
                  size="sm"
                  component={Link}
                  to={`/admin/posts/${item.postId}/prices/${item.id}/settings`}
                >
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deletePrice(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={prices}
      />
    </ScrollArea>
  )
}
