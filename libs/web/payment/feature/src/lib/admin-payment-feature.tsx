import { useRoutes } from 'react-router-dom'
import { AdminPaymentDetailFeature } from './admin-payment-detail.feature'
import { AdminPaymentListFeature } from './admin-payment-list.feature'

export default function AdminPaymentRoutes() {
  return useRoutes([
    { path: '', element: <AdminPaymentListFeature /> },
    { path: ':paymentId/*', element: <AdminPaymentDetailFeature /> },
  ])
}
