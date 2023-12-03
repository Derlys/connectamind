import { useWebAuth } from '@pubkey-stack/web-auth-data-access'
import { UiWarning } from '@pubkey-ui/core'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebUserDetailFeature } from './web-user-detail.feature'

export default function WebUserRoutes() {
  const { user } = useWebAuth()

  if (!user?.username) {
    return <UiWarning message="User not found" />
  }

  return (
    <Routes>
      <Route index element={<Navigate to={user.username} replace />} />
      <Route path=":username" element={<WebUserDetailFeature />} />
    </Routes>
  )
}
