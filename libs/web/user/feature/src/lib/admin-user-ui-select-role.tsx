import { getEnumOptions, UserRole } from '@connectamind/sdk'
import { UiSelectEnumOption } from '@connectamind/web-ui-core'

export function AdminUserUiSelectRole({
  value,
  onChange,
}: {
  value: UserRole | undefined
  onChange: (role: UserRole | undefined) => void
}) {
  return (
    <UiSelectEnumOption<UserRole>
      value={value}
      onChange={onChange}
      options={[{ value: '', label: 'Filter by role' }, ...getEnumOptions(UserRole)]}
    />
  )
}
