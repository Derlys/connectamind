import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOnePost } from '@connectamind/web-post-data-access'
import { useParams } from 'react-router-dom'
import { AdminPostDetailOverviewTab } from './admin-post-detail-overview.tab'
import { AdminPostDetailSettingsTab } from './admin-post-detail-settings.tab'

export function AdminPostDetailFeature() {
  const { postId } = useParams<{ postId: string }>() as { postId: string }
  const { item, query } = useAdminFindOnePost({ postId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Post not found." />
  }

  return (
    <UiPage
      title={<Group>{item.title}</Group>}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'overview',
            label: 'Overview',
            element: <AdminPostDetailOverviewTab postId={postId} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminPostDetailSettingsTab postId={postId} />,
          },
        ]}
      />
    </UiPage>
  )
}
