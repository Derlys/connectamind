import { useAuth } from '@connectamind/web-auth-data-access'
import { UiWarning } from '@pubkey-ui/core'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserDetailFeature } from './user-detail-feature'

export default function UserRoutes() {
  const { user } = useAuth()

  if (!user?.username) {
    return <UiWarning message="User not found" />
  }

  return (
    <Routes>
      <Route index element={<Navigate to={user.username} replace />} />
      <Route path=":username/*" element={<UserDetailFeature />} />
    </Routes>
  )
}
