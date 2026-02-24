'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Divider,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { MdEmail } from 'react-icons/md'
import { siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <Box bg="blackAlpha.500" py={10} mt={10}>
      <Container maxW="container.xl">
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'start', md: 'center' }} spacing={8}>
          <HStack spacing={2}>
            <Icon as={MdEmail} color="brand.400" w={6} h={6} />
            <Text fontSize="lg" fontWeight="bold">
              {siteConfig.name}
            </Text>
          </HStack>

          <Stack direction="row" spacing={6}>
            <Box as="a" href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>
              Terms
            </Box>
            <Box as="a" href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>
              Privacy
            </Box>
            <Box as="a" href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>
              Contact
            </Box>
          </Stack>
        </Stack>

        <Divider my={8} borderColor="whiteAlpha.200" />
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" color="whiteAlpha.600" fontSize="sm">
          <Text>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</Text>
          <Text>Designed to help teams collaborate better.</Text>
        </Stack>
      </Container>
    </Box>
  )
}
