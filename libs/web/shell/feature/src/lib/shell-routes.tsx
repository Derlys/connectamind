import { AuthLoginFeature, AuthRegisterFeature } from '@connectamind/web-auth-feature'
import { HomeFeature } from '@connectamind/web-home-feature'
import { SettingsFeature } from '@connectamind/web-settings-feature'
import { SolanaFeature } from '@connectamind/web-solana-feature'
import { UserFeature } from '@connectamind/web-user-feature'
import { UiNotFound } from '@connectamind/web-ui-core'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useGuardedRoutes } from './use-guarded-routes'
import { AuthorPostFeature, PublishedPostFeature, PurchasedPostFeature } from '@connectamind/web-post-feature'

export const LazyAdminFeature = lazy(() => import('./shell-admin-routes'))

export function ShellRoutes() {
  return useGuardedRoutes({
    index: '/dashboard',
    admin: [
      // Here you can add routes that are only accessible by admins under the /admin/* path
      // Visit /admin/custom-admin-page to see this route
      { path: 'custom-admin-page', element: <div>CUSTOM ADMIN PAGE HERE</div> },
      { path: '*', element: <LazyAdminFeature /> },
    ],
    layout: [
      // Here you can add routes that are part of the main layout
      { path: '/dashboard', element: <Navigate to="/home" /> },
      { path: '/creator/*', element: <AuthorPostFeature /> },
      { path: '/home/*', element: <PublishedPostFeature /> },
      { path: '/purchased/*', element: <PurchasedPostFeature /> },
      { path: '/u/*', element: <UserFeature /> },
      { path: '/settings/*', element: <SettingsFeature /> },
      { path: '/solana/*', element: <SolanaFeature /> },
    ],
    full: [
      // Here you can add routes that are not part of the main layout, visit /custom-full-page to see this route
      { path: 'custom-full-page', element: <div>CUSTOM FULL PAGE</div> },
    ],
    root: [
      // Routes for the auth feature
      { path: '/login', element: <AuthLoginFeature /> },
      { path: '/register', element: <AuthRegisterFeature /> },
      // Homepage
      { path: '/*', element: <HomeFeature /> },
      // Routes for the 404 page
      { path: '/404', element: <UiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}
