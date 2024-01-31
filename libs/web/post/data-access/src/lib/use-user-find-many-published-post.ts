import { UserFindManyPostInput } from '@connectamind/sdk'
import { useSdk } from '@connectamind/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyPublishedPost(props?: Partial<UserFindManyPostInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 50)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyPostInput = { page, limit, search, username: props?.username }
  const query = useQuery({
    queryKey: ['user', 'find-many-published-post', input],
    queryFn: () => sdk.userFindManyPublishedPost({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
  }
}
export function useUserFindManyPurchasedPost(props?: Partial<UserFindManyPostInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 50)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyPostInput = { page, limit, search, username: props?.username }
  const query = useQuery({
    queryKey: ['user', 'find-many-purchased-post', input],
    queryFn: () => sdk.userFindManyPurchasedPost({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
  }
}
