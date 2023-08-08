import { Button, Stepper } from '@mantine/core'
import { modals } from '@mantine/modals'
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { ellipsify, Identity, IdentityProvider } from '@pubkey-stack/sdk'
import { UiStack, UiWarn } from '@pubkey-stack/web/ui/core'
import { showNotificationError } from '@pubkey-stack/web/ui/notifications'
import { useEffect, useMemo, useState } from 'react'
import { useLinkSolana } from './identity-ui-solana-link-provider'

export function IdentityUiSolanaVerifyWizard({ identity, refresh }: { identity: Identity; refresh: () => void }) {
  const { connected, publicKey, verifyAndSign } = useLinkSolana()

  const [requesting, setRequesting] = useState(false)

  const canVerify = useMemo(
    () => identity.provider === IdentityProvider.Solana && connected && publicKey?.toBase58() === identity.providerId,
    [identity, connected, publicKey],
  )

  useEffect(() => {
    if (connected && active === 0) {
      setActive(1)
    }
  }, [connected])

  function request() {
    setRequesting(true)
    verifyAndSign(identity.providerId)
      .catch((err) => {
        console.log('error verifying identity', err)
        showNotificationError('Error verifying identity')
      })
      .finally(() => {
        setRequesting(false)
        refresh()
        modals.closeAll()
      })
  }

  const [active, setActive] = useState(0)
  return (
    <Stepper active={active} onStepClick={setActive} orientation="vertical">
      <Stepper.Step
        label={`Step 1: Connect ${identity.provider} wallet`}
        description={connected ? `Connected to ${ellipsify(publicKey?.toBase58())}` : 'Select Wallet'}
      >
        <UiStack>
          <WalletMultiButton size="lg" />
        </UiStack>
      </Stepper.Step>
      <Stepper.Step
        loading={requesting}
        label="Step 2: Verify and Sign"
        description={requesting ? 'Verifying...' : 'Verify and Sign'}
      >
        {canVerify ? (
          <UiStack>
            <Button size="lg" onClick={() => request()} loading={requesting}>
              Verify and Sign
            </Button>
          </UiStack>
        ) : (
          <UiStack>
            <UiWarn
              title="Cannot verify identity"
              message={`You must connect your Solana wallet ${ellipsify(identity.providerId)} to verify your identity.`}
            />
          </UiStack>
        )}
      </Stepper.Step>
    </Stepper>
  )
}
