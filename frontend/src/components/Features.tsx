'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { MdSecurity, MdSpeed, MdGroupWork, MdAnalytics, MdNotifications, MdIntegrationInstructions, MdAutoAwesome, MdCloudSync } from 'react-icons/md'
import Marquee from 'react-fast-marquee'

const MotionVStack = motion(VStack)

const features = [
  {
    title: 'Bank-level Security',
    description: 'Your emails are encrypted end-to-end. We adhere to the strictest compliance standards so your data stays safe.',
    icon: MdSecurity,
    color: 'blue.400',
  },
  {
    title: 'Lightning Fast Search',
    description: 'Find any email in milliseconds using our advanced query engine, specifically optimized for large inboxes.',
    icon: MdSpeed,
    color: 'purple.400',
  },
  {
    title: 'Real-time Collaboration',
    description: 'Comment, tag, and assign emails to team members without ever hitting forward or reply all.',
    icon: MdGroupWork,
    color: 'green.400',
  },
  {
    title: 'Advanced Analytics',
    description: 'Track reply rates, thread resolution times, and team performance with beautiful integrated dashboards.',
    icon: MdAnalytics,
    color: 'orange.400',
  },
  {
    title: 'Smart Notifications',
    description: 'Get notified only when it matters. AI-powered alerts keep you focused on what needs your attention.',
    icon: MdNotifications,
    color: 'red.400',
  },
  {
    title: 'Seamless Integrations',
    description: 'Connect with Slack, Teams, Jira, and 100+ tools. Sync your workflow across all platforms effortlessly.',
    icon: MdIntegrationInstructions,
    color: 'cyan.400',
  },
  {
    title: 'AI-Powered Insights',
    description: 'Automatically categorize, prioritize, and summarize emails with cutting-edge machine learning.',
    icon: MdAutoAwesome,
    color: 'pink.400',
  },
  {
    title: 'Cloud Sync',
    description: 'Access your emails from anywhere. Real-time sync across all devices with offline support.',
    icon: MdCloudSync,
    color: 'teal.400',
  },
]

export default function Features() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  return (
    <Box py={{ base: 20, md: 32 }} id="features" position="relative" w="full">
      <Container maxW="container.xl" mb={16}>
        <VStack spacing={4} textAlign="center">
          <Text
            color="brand.400"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            fontSize="sm"
          >
            Features
          </Text>
          <Heading
            size="3xl"
            maxW="2xl"
            lineHeight="1.2"
          >
            Everything you need to <br/>
            <Text as="span" bgGradient="linear(to-r, blue.400, purple.400)" bgClip="text">scale your team</Text>
          </Heading>
        </VStack>
      </Container>

      <Box w="full" py={12} overflow="hidden">

        <Marquee gradient={true} gradientColor="#1a202c" speed={50} pauseOnHover>
          {features.map((feature, index) => (
            <Box
              key={index}
              p={10}
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.200"
              w="450px"
              h="320px"
              mx={4}
            >
              <VStack align="start" spacing={5} h="full">
                <Box
                  p={3}
                  borderRadius="xl"
                  bg={feature.color}
                  color="white"
                >
                  <Icon as={feature.icon} w={7} h={7} />
                </Box>
                <Heading size="lg" fontWeight="bold" color="gray.800">
                  {feature.title}
                </Heading>
                <Text color="gray.600" fontSize="md" lineHeight="1.7">
                  {feature.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </Marquee>
      </Box>
    </Box>
  )
}
