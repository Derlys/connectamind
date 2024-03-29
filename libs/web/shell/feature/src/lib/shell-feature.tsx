import { AuthProvider } from '@connectamind/web-auth-data-access'
import { SdkProvider } from '@connectamind/web-core-data-access'
import { SolanaClusterProvider } from '@connectamind/web-solana-data-access'
import { toastError, UiThemeLink, UiThemeProvider } from '@connectamind/web-ui-core'

import 'mantine-datatable/styles.layer.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Link } from 'react-router-dom'
import { ShellRoutes } from './shell-routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        toastError(`Something went wrong`)
      },
    },
  },
})

// eslint-disable-next-line func-style
export const ThemeLink: UiThemeLink = ({ children, ...props }) => <Link {...props}>{children}</Link>

export function ShellFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <SdkProvider>
          <AuthProvider>
            <UiThemeProvider link={ThemeLink}>
              <SolanaClusterProvider>
                <ShellRoutes />
              </SolanaClusterProvider>
            </UiThemeProvider>
          </AuthProvider>
        </SdkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
