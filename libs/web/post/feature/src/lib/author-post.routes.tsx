import { useRoutes } from 'react-router-dom'
import { AuthorPostCreateFeature } from './author-post-create.feature'
import { AuthorPostListFeature } from './author-post-list.feature'
import { AuthorPostEditFeature } from './author-post-edit.feature'

export default function AuthorPostRoutes() {
  return useRoutes([
    { path: '', element: <AuthorPostListFeature /> },
    {
      path: 'create',
      element: <AuthorPostCreateFeature />,
    },
    {
      path: ':postId',
      element: <AuthorPostEditFeature />,
    },
  ])
}
