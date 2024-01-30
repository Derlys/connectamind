import { SolanaUiClusterModalAdd, SolanaUiClusterUiTable } from '@connectamind/web-solana-ui'
import { UiPage } from '@connectamind/web-ui-core'

export default function ClusterFeature() {
  return (
    <UiPage title="Clusters" rightAction={<SolanaUiClusterModalAdd />}>
      <SolanaUiClusterUiTable />
    </UiPage>
  )
}
