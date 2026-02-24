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
  Select,
  Spinner,
  Tag,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
  Avatar,
  Divider,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { api } from '@/lib/api'
import Navbar from '@/components/Navbar'
import EmailCard from '@/components/EmailCard'
import ShareEmailModal from '@/components/ShareEmailModal'

const TAGS = [
  'all',
  'general',
  'urgent',
  'fyi',
  'action-required',
  'bug',
  'feature',
]

export default function TeamDetailPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const teamId = params.id as string
  const toast = useToast()

  const [team, setTeam] = useState<any>(null)
  const [emails, setEmails] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState('all')
  const [search, setSearch] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  // Add member state
  const [memberEmail, setMemberEmail] = useState('')
  const [addingMember, setAddingMember] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login')
  }, [user, authLoading, router])

  const fetchTeam = useCallback(() => {
    api
      .getTeam(teamId)
      .then(setTeam)
      .catch(() => router.push('/teams'))
  }, [teamId, router])

  const fetchEmails = useCallback(() => {
    const tag = selectedTag === 'all' ? undefined : selectedTag
    api
      .getTeamEmails(teamId, tag, search || undefined)
      .then(setEmails)
      .finally(() => setLoading(false))
  }, [teamId, selectedTag, search])

  useEffect(() => {
    if (user) {
      fetchTeam()
      fetchEmails()
    }
  }, [user, fetchTeam, fetchEmails])

  const handleDeleteEmail = async (id: string) => {
    try {
      await api.deleteEmail(id)
      toast({ title: 'Email deleted', status: 'info' })
      fetchEmails()
    } catch (e: any) {
      toast({ title: e.message, status: 'error' })
    }
  }

  const handleAddMember = async () => {
    if (!memberEmail.trim()) return
    setAddingMember(true)
    try {
      await api.addMember(teamId, { email: memberEmail })
      toast({ title: 'Member added!', status: 'success' })
      setMemberEmail('')
      fetchTeam()
    } catch (e: any) {
      toast({ title: e.message, status: 'error' })
    } finally {
      setAddingMember(false)
    }
  }

  if (authLoading || !user || !team) {
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
      <Navbar />
      <Container maxW="6xl" py={8}>
        {/* Team Header */}
        <HStack justify="space-between" mb={2}>
          <Box>
            <Heading size="lg">{team.name}</Heading>
            <Text color="gray.500">{team.description}</Text>
          </Box>
          <Button leftIcon={<AddIcon />} colorScheme="brand" onClick={onOpen}>
            Share Email
          </Button>
        </HStack>

        {/* Members */}
        <Box bg="white" p={5} rounded="xl" shadow="sm" mb={6} mt={4}>
          <Heading size="sm" mb={3}>
            Members ({team.members?.length ?? 0})
          </Heading>
          <Wrap mb={4}>
            {team.members?.map((m: any) => (
              <WrapItem key={m.id}>
                <HStack bg="gray.50" px={3} py={1} rounded="full">
                  <Avatar size="xs" name={m.name} />
                  <Text fontSize="sm">{m.name}</Text>
                </HStack>
              </WrapItem>
            ))}
          </Wrap>
          {team.owner_id === user.id && (
            <HStack>
              <Input
                size="sm"
                placeholder="Add member by email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                maxW="300px"
              />
              <Button
                size="sm"
                colorScheme="brand"
                isLoading={addingMember}
                onClick={handleAddMember}
              >
                Add
              </Button>
            </HStack>
          )}
        </Box>

        <Divider mb={6} />

        {/* Filters */}
        <HStack mb={6} flexWrap="wrap" spacing={3}>
          <InputGroup maxW="300px" size="sm">
            <InputLeftElement>
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search emails…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="white"
            />
          </InputGroup>
          <Wrap>
            {TAGS.map((t) => (
              <WrapItem key={t}>
                <Tag
                  size="md"
                  cursor="pointer"
                  colorScheme={selectedTag === t ? 'brand' : 'gray'}
                  onClick={() => setSelectedTag(t)}
                >
                  {t}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </HStack>

        {/* Emails */}
        {loading ? (
          <Spinner />
        ) : emails.length === 0 ? (
          <VStack py={16} bg="white" rounded="xl" shadow="sm">
            <Text color="gray.400" fontSize="lg">
              No emails shared yet.
            </Text>
            <Button colorScheme="brand" onClick={onOpen}>
              Share the first email
            </Button>
          </VStack>
        ) : (
          <VStack spacing={4} align="stretch">
            {emails.map((e) => (
              <EmailCard
                key={e.id}
                email={e}
                canDelete={e.shared_by === user.id}
                onDelete={handleDeleteEmail}
              />
            ))}
          </VStack>
        )}

        <ShareEmailModal
          isOpen={isOpen}
          onClose={onClose}
          teamId={teamId}
          onSuccess={fetchEmails}
        />
      </Container>
    </Box>
  )
}
