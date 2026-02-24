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
import { motion } from 'framer-motion'
import { MdSpeed, MdSecurity, MdTrendingUp, MdGroups } from 'react-icons/md'

const MotionBox = motion(Box)

const values = [
  {
    icon: MdSpeed,
    title: 'Save 10+ hours per week',
    description: 'Eliminate email forwarding, CC chains, and context switching. Your team focuses on work, not inbox management.',
    metric: '10hrs/week',
  },
  {
    icon: MdGroups,
    title: 'Improve team alignment',
    description: 'Everyone sees the same information at the same time. No more "Did you see that email?" conversations.',
    metric: '100% visibility',
  },
  {
    icon: MdTrendingUp,
    title: 'Faster decision making',
    description: 'Critical emails reach the right people instantly. Tag, search, and act on important communications in seconds.',
    metric: '3x faster',
  },
  {
    icon: MdSecurity,
    title: 'Reduce security risks',
    description: 'Centralized access control and audit trails. Know exactly who saw what, when, and take action if needed.',
    metric: 'Enterprise-grade',
  },
]

export default function ProblemSolving() {
  return (
    <Box py={{ base: 20, md: 32 }} position="relative">
      <Container maxW="container.xl">
        <VStack spacing={4} mb={16} textAlign="center">
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="extrabold"
            color="white"
          >
            Built for business impact
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.700" maxW="2xl">
            Real results from teams who stopped fighting their inbox and started collaborating.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {values.map((item, i) => (
            <MotionBox
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(16px)"
                p={6}
                rounded="2xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
                h="full"
                _hover={{ borderColor: 'brand.400', transform: 'translateY(-4px)' }}
                transition="all 0.3s"
              >
                <VStack align="stretch" spacing={4}>
                  <Icon as={item.icon} w={10} h={10} color="brand.400" />
                  <Box>
                    <Text fontSize="2xl" fontWeight="bold" color="brand.300" mb={2}>
                      {item.metric}
                    </Text>
                    <Heading size="sm" color="white" mb={2}>
                      {item.title}
                    </Heading>
                    <Text fontSize="sm" color="whiteAlpha.700">
                      {item.description}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
