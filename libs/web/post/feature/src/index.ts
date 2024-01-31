import { lazy } from 'react'

export const AdminPostFeature = lazy(() => import('./lib/admin-post.routes'))
export const AuthorPostFeature = lazy(() => import('./lib/author-post.routes'))
export const AuthorPostEditFeature = lazy(() => import('./lib/author-post-edit.routes'))
export const PublishedPostFeature = lazy(() => import('./lib/user-published-post.routes'))
export const PurchasedPostFeature = lazy(() => import('./lib/user-purchased-post.routes'))
