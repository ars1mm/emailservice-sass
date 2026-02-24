'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { MdEmail } from 'react-icons/md'
import { FaLinkedin } from 'react-icons/fa'

const MotionBox = motion(Box)

export default function FounderProfile() {
  return (
    <Box py={{ base: 20, md: 32 }} position="relative">
      <Container maxW="container.lg">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(16px)"
            p={{ base: 8, md: 12 }}
            rounded="2xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
            position="relative"
            overflow="hidden"
          >
            {/* Background gradient */}
            <Box
              position="absolute"
              top="-50%"
              right="-20%"
              w="500px"
              h="500px"
              borderRadius="full"
              bg="brand.500"
              opacity={0.1}
              filter="blur(100px)"
              pointerEvents="none"
            />

            <VStack spacing={8} position="relative" zIndex={1}>
              {/* Header */}
              <VStack spacing={4} textAlign="center">
                <Avatar
                  size="2xl"
                  name="Arsim Ajvazi"
                  src="https://media.licdn.com/dms/image/v2/D4D03AQFXYBJ0TXOzpQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727274000616?e=1773273600&v=beta&t=x8TOU11UvX3l2K5c9d8Ci-fuFawcxRCHw4dKFG6_bsE"
                  bg="brand.500"
                  color="white"
                  fontWeight="bold"
                  fontSize="3xl"
                />
                <Box>
                  <Heading size="lg" color="white" mb={2}>
                    Arsim Ajvazi
                  </Heading>
                  <Text color="brand.300" fontWeight="medium">
                    Founder & CEO
                  </Text>
                </Box>
              </VStack>

              {/* Story */}
              <VStack spacing={4} maxW="3xl" textAlign="center">
                <Text fontSize="lg" color="whiteAlpha.900" lineHeight="tall">
                  "Hi, I'm Arsim—founder of EmailShare. I built this platform to help teams cut through 
                  email noise and focus on what matters: fast decisions and clear communication."
                </Text>
                <Text fontSize="md" color="whiteAlpha.700" lineHeight="tall">
                  EmailShare reduces email overhead by 70%, cuts decision-making time in half, and gives 
                  leadership complete visibility into critical communications. We're building the infrastructure 
                  for how modern teams share and act on information.
                </Text>
                <Text fontSize="md" color="whiteAlpha.700" lineHeight="tall">
                  Join 500+ teams already saving 10+ hours per week. Let's build better collaboration together.
                </Text>
              </VStack>

              {/* Contact */}
              <HStack spacing={4} pt={4}>
                <HStack
                  as="a"
                  href="https://linkedin.com/in/arsimajvazi"
                  target="_blank"
                  rel="noopener noreferrer"
                  spacing={2}
                  px={4}
                  py={2}
                  rounded="full"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="whiteAlpha.800"
                  _hover={{ bg: 'whiteAlpha.200', borderColor: 'brand.400' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <Icon as={FaLinkedin} w={5} h={5} />
                  <Text fontSize="sm" fontWeight="medium">LinkedIn</Text>
                </HStack>
                <HStack
                  as="a"
                  href="mailto:arsim@emailshare.com"
                  spacing={2}
                  px={4}
                  py={2}
                  rounded="full"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="whiteAlpha.800"
                  _hover={{ bg: 'whiteAlpha.200', borderColor: 'brand.400' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <Icon as={MdEmail} w={5} h={5} />
                  <Text fontSize="sm" fontWeight="medium">Email</Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}
