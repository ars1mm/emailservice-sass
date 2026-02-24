'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from '@/lib/auth'

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  styles: {
    global: {
      body: {
        bg: '#09090b',
        color: '#ededed',
      },
    },
  },
  fonts: {
    heading: `'var(--font-outfit)', sans-serif`,
    body: `'var(--font-outfit)', sans-serif`,
  },
  colors: {
    brand: {
      50: '#e5f3ff',
      100: '#cce7ff',
      200: '#99d0ff',
      300: '#66b8ff',
      400: '#33a1ff',
      500: '#008aff',
      600: '#006ecc',
      700: '#005399',
      800: '#003766',
      900: '#001c33',
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  )
}
