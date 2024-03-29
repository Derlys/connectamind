import { UserUpdateUserInput } from '@connectamind/sdk'
import { useAuth, useMe } from '@connectamind/web-auth-data-access'
import { useSdk } from '@connectamind/web-core-data-access'
import { toastError } from '@connectamind/web-ui-core'
import { useUserFineOneUser } from './use-user-fine-one-user'

export function useUserProfile() {
  const sdk = useSdk()
  const me = useMe(sdk)
  const { user } = useAuth()
  const { query } = useUserFineOneUser({ username: user?.username as string })

  return {
    user: query.data?.item,
    query,
    updateUser: async (input: UserUpdateUserInput) => {
      return sdk
        .userUpdateUser({
          input,
        })
        .then(async (res) => {
          await Promise.all([query.refetch(), me.refetch()])
          return !!res.data
        })
        .catch((err) => {
          toastError(err.message)
          return false
        })
    },
  }
}
