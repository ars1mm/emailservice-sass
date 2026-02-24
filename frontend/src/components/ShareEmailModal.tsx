'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { api } from '@/lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  teamId: string
  onSuccess: () => void
}

const TAGS = ['general', 'urgent', 'fyi', 'action-required', 'bug', 'feature']

export default function ShareEmailModal({
  isOpen,
  onClose,
  teamId,
  onSuccess,
}: Props) {
  const [subject, setSubject] = useState('')
  const [sender, setSender] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('general')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async () => {
    if (!subject || !sender || !body) {
      toast({ title: 'All fields are required', status: 'warning' })
      return
    }
    setLoading(true)
    try {
      await api.shareEmail({ subject, sender, body, tag, team_id: teamId })
      toast({ title: 'Email shared!', status: 'success' })
      setSubject('')
      setSender('')
      setBody('')
      setTag('general')
      onSuccess()
      onClose()
    } catch (e: any) {
      toast({ title: e.message, status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share an Email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject line"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Sender</FormLabel>
              <Input
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="who@sent-this.com"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Body</FormLabel>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Paste the email body here…"
                rows={8}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tag</FormLabel>
              <Select value={tag} onChange={(e) => setTag(e.target.value)}>
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Share
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
