"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "@/lib/auth";

const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: "#e6f2ff",
      100: "#b3d9ff",
      200: "#80bfff",
      300: "#4da6ff",
      400: "#1a8cff",
      500: "#0073e6",
      600: "#005bb4",
      700: "#004282",
      800: "#002a50",
      900: "#00111f",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
