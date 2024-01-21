import { useRoutes } from 'react-router-dom'
import { UserPostDetailFeature } from './user-post-detail.feature'
import { UserPostCreateFeature } from './user-post-create.feature'
import { UserPostListFeature } from './user-post-list.feature'

export default function UserPostRoutes() {
  return useRoutes([
    { path: '', element: <UserPostListFeature /> },
    {
      path: 'create',
      element: <UserPostCreateFeature />,
    },
    { path: ':postId/*', element: <UserPostDetailFeature /> },
  ])
}
