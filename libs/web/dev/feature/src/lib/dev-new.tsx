import { Button, Code, Group } from '@mantine/core'
import { toastSuccess, UiCard, UiInfo, UiStack } from '@connectamind/web-ui-core'

export function DevNew() {
  return (
    <UiCard title="New">
      <UiStack>
        <UiInfo
          title="A place for your new stuff"
          message={
            <Group gap={0} align="baseline">
              Open <Code mx={4}>libs/web/dev/feature/src/lib/web-dev-new.tsx</Code> to get started.
            </Group>
          }
        />
        <Group justify="center">
          <Button onClick={() => toastSuccess('gm!')}>Click me!</Button>
        </Group>
      </UiStack>
    </UiCard>
  )
}
