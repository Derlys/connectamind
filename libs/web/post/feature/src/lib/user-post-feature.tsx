import { useRoutes } from 'react-router-dom'
import { UserPostDetailFeature } from './user-post-detail.feature'
import { UserPostCreateFeature } from './user-post-create.feature'
import { UserPostListFeature } from './user-post-list.feature'
import { UserPostEditFeature } from './user-post-edit.feature'

export default function UserPostRoutes() {
  return useRoutes([
    { path: '', element: <UserPostListFeature /> },
    {
      path: 'create',
      element: <UserPostCreateFeature />,
    },
    { path: ':postId/edit/*', element: <UserPostEditFeature /> },
    { path: ':postId/*', element: <UserPostDetailFeature /> },
  ])
}
