import { getEnumOptions, UserStatus } from '@connectamind/sdk'
import { UiSelectEnumOption } from '@connectamind/web-ui-core'

export function AdminUserUiSelectStatus({
  value,
  onChange,
}: {
  value: UserStatus | undefined
  onChange: (value: UserStatus | undefined) => void
}) {
  return (
    <UiSelectEnumOption<UserStatus>
      value={value}
      onChange={onChange}
      options={[{ value: '', label: 'Filter by status' }, ...getEnumOptions(UserStatus)]}
    />
  )
}
