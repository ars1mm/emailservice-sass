'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function TeamsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login')
  }, [user, authLoading, router])

  const fetchTeams = () => {
    api
      .getTeams()
      .then(setTeams)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (user) fetchTeams()
  }, [user])

  const handleCreate = async () => {
    if (!newName.trim()) return
    setCreating(true)
    try {
      await api.createTeam({ name: newName, description: newDesc })
      toast({ title: 'Team created!', status: 'success' })
      setNewName('')
      setNewDesc('')
      onClose()
      fetchTeams()
    } catch (e: any) {
      toast({ title: e.message, status: 'error' })
    } finally {
      setCreating(false)
    }
  }

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
        <HStack justify="space-between" mb={6} flexWrap="wrap" gap={3}>
          <Heading size={{ base: 'md', md: 'lg' }}>Teams</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="brand" onClick={onOpen} size={{ base: 'sm', md: 'md' }}>
            New Team
          </Button>
        </HStack>

        {loading ? (
          <Spinner />
        ) : teams.length === 0 ? (
          <VStack py={16} bg="white" rounded="xl" shadow="sm">
            <Text color="gray.400" fontSize="lg">
              No teams yet — create one to get started!
            </Text>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {teams.map((t) => (
              <Box
                key={t.id}
                bg="white"
                p={6}
                rounded="xl"
                shadow="sm"
                cursor="pointer"
                _hover={{ shadow: 'md', borderColor: 'brand.200' }}
                borderWidth="1px"
                onClick={() => router.push(`/teams/${t.id}`)}
              >
                <Heading size="sm" mb={1}>
                  {t.name}
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  {t.description || 'No description'}
                </Text>
                <Text fontSize="xs" color="gray.400" mt={3}>
                  {t.members?.length ?? 0} members · Created{' '}
                  {new Date(t.created_at).toLocaleDateString()}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        )}

        {/* Create Team Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', sm: 'md' }}>
          <ModalOverlay />
          <ModalContent mx={{ base: 0, sm: 4 }}>
            <ModalHeader>Create a Team</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Team Name</FormLabel>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Engineering"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="What is this team about?"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="brand"
                isLoading={creating}
                onClick={handleCreate}
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  )
}
