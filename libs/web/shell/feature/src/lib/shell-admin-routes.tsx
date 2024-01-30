import { DevAdminRoutes } from '@connectamind/web-dev-feature'
import { AdminUserFeature } from '@connectamind/web-user-feature'
import { UiContainer, UiDashboardGrid, UiDashboardItem, UiNotFound } from '@connectamind/web-ui-core'
import { IconBook, IconUsers } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { AdminPostFeature } from '@connectamind/web-post-feature'
import { AdminPaymentFeature } from '@connectamind/web-payment-feature'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-feature generator
  { label: 'Posts', icon: IconBook, to: '/admin/posts' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
  { label: 'Payments', icon: IconUsers, to: '/admin/payments' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-feature generator
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: 'posts/*', element: <AdminPostFeature /> },
  { path: 'payments/*', element: <AdminPaymentFeature /> },
]

export default function ShellAdminRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: (
        <UiContainer>
          <UiDashboardGrid links={links} />
        </UiContainer>
      ),
    },
    ...routes,
    { path: '*', element: <UiNotFound to="/admin" /> },
  ])
}
