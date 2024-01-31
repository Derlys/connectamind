import { Grid } from '@mantine/core'
import type { ReactNode } from 'react'

export function UiGrid({ children, sidebar }: { children: ReactNode; sidebar: ReactNode }) {
  return (
    <Grid>
      <Grid.Col span={{ sm: 3 }}>{sidebar}</Grid.Col>
      <Grid.Col span={{ sm: 9 }}>{children}</Grid.Col>
    </Grid>
  )
}
