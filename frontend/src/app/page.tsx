'use client'

import { Box } from '@chakra-ui/react'
import Hero from '@/components/Hero'
import ProblemSolving from '@/components/ProblemSolving'
import Features from '@/components/Features'
import PerformanceChart from '@/components/PerformanceChart'
import FounderProfile from '@/components/FounderProfile'
import TrustpilotReviews from '@/components/TrustpilotReviews'
import CTASection from '@/components/CTASection'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <Box minH="100vh" bg="#09090b" overflowX="hidden">
      <Box pt={24}>
        <Hero />
        <ProblemSolving />
        <Features />
        <PerformanceChart />
        <FounderProfile />
        <TrustpilotReviews />
        <CTASection />
        <Pricing />
      </Box>
      <Footer />
    </Box>
  )
}

