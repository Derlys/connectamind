import { SVGProps } from 'react'
import { UiLogo } from './ui-logo'
import { Group, Text } from '@mantine/core'

export interface UiLogoTypeProps extends SVGProps<SVGSVGElement> {
  height?: number
  width?: number
}
export function UiLogoType(props: UiLogoTypeProps = {}) {
  return (
    <Group gap="xs">
      <UiLogo height={props.height} width={props.width} />
      <Text size="xl" fw="bold">
        Connect a Mind
      </Text>
    </Group>
  )
}
