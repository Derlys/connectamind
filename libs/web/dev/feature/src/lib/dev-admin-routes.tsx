import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'
import { DevUserAutocomplete } from './dev-user-autocomplete'
import { DevBuy } from './dev-buy'

export default function DevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { path: 'new', label: 'New', element: <DevNew /> },
          { path: 'buy', label: 'Buy', element: <DevBuy /> },
          { path: 'identity-wizard', label: 'Identity Wizard', element: <DevIdentityWizard /> },
          { path: 'user-autocomplete', label: 'User Autocomplete', element: <DevUserAutocomplete /> },
        ]}
      />
    </UiContainer>
  )
}
