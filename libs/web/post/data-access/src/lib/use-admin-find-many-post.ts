import { AdminCreatePostInput, AdminFindManyPostInput } from '@connectamind/sdk'
import { useSdk } from '@connectamind/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyPost(props?: Partial<AdminFindManyPostInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyPostInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-post', input],
    queryFn: () => sdk.adminFindManyPost({ input }).then((res) => res.data),
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
    createPost: (input: AdminCreatePostInput) =>
      sdk
        .adminCreatePost({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Post created`)
          } else {
            toastError(`Post not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deletePost: (postId: string) =>
      sdk.adminDeletePost({ postId }).then(() => {
        toastSuccess('Post deleted')
        return query.refetch()
      }),
  }
}
