'use client'

import { Box } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import TrustpilotReviews from '@/components/TrustpilotReviews'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <Box minH="100vh" bg="#09090b" overflowX="hidden">
      <Navbar />
      <Box pt={24}>
        <Hero />
        <Features />
        <TrustpilotReviews />
        <Pricing />
      </Box>
      <Footer />
    </Box>
  )
}

