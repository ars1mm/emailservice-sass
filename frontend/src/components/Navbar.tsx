'use client'

import {
  Box,
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Text,
  Icon,
  IconButton,
  VStack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { MdEmail, MdMenu } from 'react-icons/md'

const MotionBox = motion(Box)

export default function Navbar() {
  const bg = useColorModeValue('rgba(255, 255, 255, 0.05)', 'rgba(9, 9, 11, 0.6)')
  const borderColor = useColorModeValue('whiteAlpha.300', 'whiteAlpha.200')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box position="fixed" w="100%" zIndex={100} top={{ base: 2, md: 4 }}>
      <Flex maxW="1200px" mx="auto" px={{ base: 2, md: 4 }} justify="center">
        <MotionBox
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg={bg}
          backdropFilter="blur(16px)"
          w="100%"
          maxW="800px"
          px={{ base: 4, md: 6 }}
          py={3}
          borderRadius="full"
          border="1px solid"
          borderColor={borderColor}
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <HStack spacing={2} as={Link} href="/" _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
            <Icon as={MdEmail} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="brand.400" />
            <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }} letterSpacing="tight">
              {siteConfig.name}
            </Text>
          </HStack>

          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {['Features', 'Pricing', 'Docs'].map((item) => (
              <Box
                key={item}
                as="a"
                href={`#${item.toLowerCase()}`}
                fontSize="sm"
                fontWeight="medium"
                color="whiteAlpha.700"
                _hover={{ color: 'white' }}
                transition="all 0.2s"
              >
                {item}
              </Box>
            ))}
          </HStack>

          <HStack spacing={{ base: 2, md: 4 }} display={{ base: 'none', sm: 'flex' }}>
            <Button
              as="a"
              href={`${siteConfig.dashboardUrl}/login`}
              variant="ghost"
              colorScheme="whiteAlpha"
              size="sm"
              borderRadius="full"
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              Sign In
            </Button>
            <Button
              as="a"
              href={`${siteConfig.dashboardUrl}/register`}
              colorScheme="brand"
              size="sm"
              borderRadius="full"
              px={{ base: 4, md: 6 }}
              position="relative"
              overflow="hidden"
              sx={{
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  w: '100%',
                  h: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover::before': {
                  left: '100%',
                },
              }}
            >
              Get Started
            </Button>
          </HStack>

          <IconButton
            aria-label="Menu"
            icon={<MdMenu />}
            display={{ base: 'flex', sm: 'none' }}
            variant="ghost"
            colorScheme="whiteAlpha"
            size="sm"
            onClick={onOpen}
          />
        </MotionBox>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900">
          <DrawerCloseButton color="white" />
          <DrawerBody pt={16}>
            <VStack spacing={6} align="stretch">
              {['Features', 'Pricing', 'Docs'].map((item) => (
                <Box
                  key={item}
                  as="a"
                  href={`#${item.toLowerCase()}`}
                  fontSize="lg"
                  fontWeight="medium"
                  color="whiteAlpha.800"
                  _hover={{ color: 'white' }}
                  onClick={onClose}
                >
                  {item}
                </Box>
              ))}
              <Button
                as="a"
                href={`${siteConfig.dashboardUrl}/login`}
                variant="outline"
                colorScheme="whiteAlpha"
                w="full"
              >
                Sign In
              </Button>
              <Button
                as="a"
                href={`${siteConfig.dashboardUrl}/register`}
                colorScheme="brand"
                w="full"
              >
                Get Started
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
