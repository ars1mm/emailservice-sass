'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  Link as ChakraLink,
  useToast,
  Icon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import NextLink from 'next/link'
import { MdEmail } from 'react-icons/md'
import { siteConfig } from '@/config/site'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      toast({ title: err.message, status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="100vh" bg="#09090b" display="flex" alignItems="center" py={{ base: 4, md: 0 }} position="relative" overflow="hidden">
      {/* Background Glow */}
      <Box
        position="absolute"
        top="-20%"
        left="50%"
        transform="translateX(-50%)"
        w="100%"
        h="100%"
        maxW="800px"
        pointerEvents="none"
        zIndex={0}
        sx={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 138, 255, 0.15) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <Container maxW="md" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <VStack spacing={8}>
          {/* Logo */}
          <VStack spacing={2} as={NextLink} href="/" cursor="pointer">
            <Icon as={MdEmail} w={12} h={12} color="brand.400" />
            <Text fontSize="2xl" fontWeight="bold" color="white" letterSpacing="tight">
              {siteConfig.name}
            </Text>
          </VStack>

          <Box 
            bg="rgba(255, 255, 255, 0.05)" 
            backdropFilter="blur(16px)"
            p={{ base: 6, md: 8 }} 
            rounded="2xl" 
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
            w="full"
          >
            <Heading size={{ base: 'md', md: 'lg' }} mb={6} textAlign="center" color="white">
              Welcome back
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="whiteAlpha.800">Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: 'whiteAlpha.500' }}
                    _hover={{ borderColor: 'whiteAlpha.300' }}
                    _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="whiteAlpha.800">Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: 'whiteAlpha.500' }}
                    _hover={{ borderColor: 'whiteAlpha.300' }}
                    _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="brand"
                  w="full"
                  isLoading={loading}
                  size="lg"
                  mt={2}
                >
                  Log In
                </Button>
              </VStack>
            </form>
            <Text mt={6} textAlign="center" fontSize="sm" color="whiteAlpha.700">
              Don&apos;t have an account?{' '}
              <ChakraLink as={NextLink} href="/register" color="brand.400" fontWeight="medium" _hover={{ color: 'brand.300' }}>
                Sign up
              </ChakraLink>
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
