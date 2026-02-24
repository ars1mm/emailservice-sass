'use client'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Spinner,
  VStack,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      api
        .getTeams()
        .then(setTeams)
        .finally(() => setLoading(false))
    }
  }, [user])

  if (authLoading || !user) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="6xl" py={8} pt={24}>
        <Heading size={{ base: 'md', md: 'lg' }} mb={2}>
          Welcome back, {user.name} 👋
        </Heading>
        <Text color="gray.500" mb={8} fontSize={{ base: 'sm', md: 'md' }}>
          Here&apos;s your overview.
        </Text>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
              <Stat bg="white" p={6} rounded="xl" shadow="sm">
                <StatLabel>Teams</StatLabel>
                <StatNumber>{teams.length}</StatNumber>
              </Stat>
              <Stat bg="white" p={6} rounded="xl" shadow="sm">
                <StatLabel>Your Role</StatLabel>
                <StatNumber fontSize="xl">Member</StatNumber>
              </Stat>
              <Stat bg="white" p={6} rounded="xl" shadow="sm">
                <StatLabel>Quick Actions</StatLabel>
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="brand"
                  onClick={() => router.push('/teams')}
                >
                  Go to Teams →
                </Button>
              </Stat>
            </SimpleGrid>

            <Heading size="md" mb={4}>
              Your Teams
            </Heading>
            {teams.length === 0 ? (
              <VStack py={10} bg="white" rounded="xl" shadow="sm">
                <Text color="gray.400">No teams yet.</Text>
                <Button
                  colorScheme="brand"
                  onClick={() => router.push('/teams')}
                  size={{ base: 'sm', md: 'md' }}
                >
                  Create your first team
                </Button>
              </VStack>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {teams.map((t) => (
                  <Box
                    key={t.id}
                    bg="white"
                    p={5}
                    rounded="xl"
                    shadow="sm"
                    cursor="pointer"
                    _hover={{ shadow: 'md' }}
                    onClick={() => router.push(`/teams/${t.id}`)}
                  >
                    <Heading size="sm">{t.name}</Heading>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      {t.description || 'No description'}
                    </Text>
                    <Text fontSize="xs" color="gray.400" mt={2}>
                      {t.members?.length ?? 0} members
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}
