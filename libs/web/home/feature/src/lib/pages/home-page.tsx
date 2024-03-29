import { Button, Container, Group, Text, Title } from '@mantine/core'
import { UiStack } from '@connectamind/web-ui-core'
import { IconBrandGithub, IconRocket } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <Container size={800}>
      <UiStack gap="xl" my="xl">
        <Title>Welcome to Connectamind.</Title>

        <Text c="dimmed">This is the Connectamind starter project.</Text>
        <Group>
          <Button component={Link} to="/dashboard" size="xl" color="brand" leftSection={<IconRocket />}>
            Get started
          </Button>
          <Button component={Link} to="/about" variant="light" size="xl" color="brand">
            About
          </Button>

          <Button
            component={'a'}
            href="https://github.com/pubkeyapp/connectamind"
            size="xl"
            variant="default"
            leftSection={<IconBrandGithub />}
          >
            Star on GitHub
          </Button>
        </Group>
      </UiStack>
    </Container>
  )
}
