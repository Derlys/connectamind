import { useRoutes } from 'react-router-dom'
import { AdminPostDetailFeature } from './admin-post-detail.feature'
import { AdminPostCreateFeature } from './admin-post-create.feature'
import { AdminPostListFeature } from './admin-post-list.feature'

export default function AdminPostRoutes() {
  return useRoutes([
    { path: '', element: <AdminPostListFeature /> },
    {
      path: 'create',
      element: <AdminPostCreateFeature />,
    },
    { path: ':postId/*', element: <AdminPostDetailFeature /> },
  ])
}
