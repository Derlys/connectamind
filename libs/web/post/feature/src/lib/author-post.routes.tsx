import { useRoutes } from 'react-router-dom'
import { AuthorPostCreateFeature } from './author-post-create.feature'
import { AuthorPostListFeature } from './author-post-list.feature'

export default function AuthorPostRoutes() {
  return useRoutes([
    { path: '', element: <AuthorPostListFeature /> },
    {
      path: 'create',
      element: <AuthorPostCreateFeature />,
    },
  ])
}
