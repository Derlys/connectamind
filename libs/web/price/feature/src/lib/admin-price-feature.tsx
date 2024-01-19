import { useRoutes } from 'react-router-dom'
import { AdminPriceDetailFeature } from './admin-price-detail.feature'
import { AdminPriceCreateFeature } from './admin-price-create.feature'
import { AdminPriceListFeature } from './admin-price-list.feature'

export default function AdminPriceRoutes({ postId }: { postId: string }) {
  return useRoutes([
    { path: '', element: <AdminPriceListFeature postId={postId} /> },
    {
      path: 'create',
      element: <AdminPriceCreateFeature postId={postId} />,
    },
    { path: ':priceId/*', element: <AdminPriceDetailFeature /> },
  ])
}
