import { useRoutes } from 'react-router-dom'
import { AuthorPostEditFeature } from './author-post-edit.feature'

export default function AuthorPostEditRoutes() {
  return useRoutes([{ path: '', element: <AuthorPostEditFeature /> }])
}
