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
import { MdSecurity, MdSpeed, MdGroupWork, MdAnalytics } from 'react-icons/md'

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
]

export default function Features() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  return (
    <Box py={{ base: 20, md: 32 }} id="features" position="relative">
      <Container maxW="container.xl">
        <VStack spacing={4} textAlign="center" mb={16}>
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
            <Text as="span" color="whiteAlpha.700">scale your team</Text>
          </Heading>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {features.map((feature, index) => (
            <MotionVStack
              key={index}
              align="start"
              p={10}
              bg="whiteAlpha.50"
              borderRadius="3xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              spacing={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.1 }
                }
              }}
              _hover={{
                bg: 'whiteAlpha.100',
                transform: 'translateY(-4px)',
                borderColor: 'whiteAlpha.300',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="-50%"
                right="-20%"
                w="150px"
                h="150px"
                bg={feature.color}
                filter="blur(100px)"
                opacity={0.15}
                borderRadius="full"
              />
              <Box
                p={4}
                borderRadius="2xl"
                bg="whiteAlpha.100"
                color={feature.color}
                boxShadow="inset 0 2px 4px rgba(255,255,255,0.05)"
              >
                <Icon as={feature.icon} w={8} h={8} />
              </Box>
              <Heading size="md" fontWeight="bold">
                {feature.title}
              </Heading>
              <Text color="whiteAlpha.600" fontSize="lg" lineHeight="1.6">
                {feature.description}
              </Text>
            </MotionVStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
