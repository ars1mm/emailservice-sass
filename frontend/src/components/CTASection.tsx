'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { MdArrowForward, MdCheck } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const MotionBox = motion(Box)
const TEST_MODE = process.env.NEXT_PUBLIC_TEST_MODE === 'true'

export default function CTASection() {
  const router = useRouter()

  return (
    <Box py={{ base: 20, md: 32 }} bg="#09090b" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="600px"
        h="600px"
        bg="blue.500"
        filter="blur(150px)"
        opacity={0.15}
        borderRadius="full"
      />
      
      <Container maxW="container.md" position="relative">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={8} textAlign="center">
            <Box
              bg="blue.500"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
            >
              🎉 Limited Time Offer
            </Box>

            <Heading size="3xl" color="white" lineHeight="1.2">
              Start sharing emails smarter today
            </Heading>

            <Text fontSize="xl" color="whiteAlpha.700" maxW="xl">
              Join 10,000+ teams already using EmailShare to streamline their communication
            </Text>

            <HStack spacing={6} flexWrap="wrap" justify="center">
              <HStack spacing={2}>
                <Icon as={MdCheck} color="green.400" w={5} h={5} />
                <Text color="whiteAlpha.800">Free 14-day trial</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={MdCheck} color="green.400" w={5} h={5} />
                <Text color="whiteAlpha.800">No credit card required</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={MdCheck} color="green.400" w={5} h={5} />
                <Text color="whiteAlpha.800">Cancel anytime</Text>
              </HStack>
            </HStack>

            <VStack spacing={4} w="full" maxW="md">
              <Button
                size="lg"
                colorScheme="blue"
                w="full"
                h="60px"
                fontSize="lg"
                fontWeight="bold"
                onClick={() => window.location.href = '#pricing'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)'
                }}
                transition="all 0.3s"
              >
                View Pricing Plans
              </Button>
              
              <HStack spacing={3}>
                <AvatarGroup size="sm" max={4}>
                  <Avatar name="User 1" bg="blue.500" />
                  <Avatar name="User 2" bg="purple.500" />
                  <Avatar name="User 3" bg="green.500" />
                  <Avatar name="User 4" bg="orange.500" />
                </AvatarGroup>
                <Text fontSize="sm" color="whiteAlpha.600">
                  <Text as="span" fontWeight="bold" color="white">2,847</Text> users signed up this week
                </Text>
              </HStack>
            </VStack>

            <Text fontSize="sm" color="whiteAlpha.500" mt={4}>
              {TEST_MODE ? (
                'Demo Mode - Authentication disabled'
              ) : (
                <>
                  Already have an account?{' '}
                  <Text
                    as="span"
                    color="blue.400"
                    fontWeight="bold"
                    cursor="pointer"
                    onClick={() => router.push('/login')}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Sign in
                  </Text>
                </>
              )}
            </Text>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}
