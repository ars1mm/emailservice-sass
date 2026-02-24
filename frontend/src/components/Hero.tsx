'use client'

import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  Image,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { MdArrowForward } from 'react-icons/md'
import { siteConfig } from '@/config/site'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

export default function Hero() {


  return (
    <Box position="relative" overflow="hidden" pt={{ base: 32, md: 40 }} pb={{ base: 20, md: 32 }}>
      {/* Background Glow */}
      <Box
        position="absolute"
        top="-20%"
        left="50%"
        transform="translateX(-50%)"
        w="100%"
        h="100%"
        maxW="1000px"
        pointerEvents="none"
        zIndex={-1}
        sx={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 138, 255, 0.25) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <Container maxW="container.lg">
        <MotionVStack
          spacing={8}
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <Box
            px={4}
            py={1}
            borderRadius="full"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.200"
            color="brand.300"
            fontSize="sm"
            fontWeight="medium"
          >
            Introducing the new standard for email collaboration
          </Box> */}

          <Heading
            as="h1"
            fontSize="clamp(2.5rem, 6vw, 5rem)"
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="1"
          >
            Share emails with your <br />
            <Text 
              as="span" 
              bgGradient="linear(to-r, #00D4FF, #0080FF, #0040FF)"
              bgClip="text"
              sx={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              entire team, instantly.
            </Text>
          </Heading>

          <Text fontSize="xl" color="whiteAlpha.700" maxW="2xl">
            {siteConfig.description} Stop forwarding and start collaborating in real-time.
          </Text>

          <HStack spacing={4} pt={4}>
            <Button
              as="a"
              href={`${siteConfig.dashboardUrl}/login`}
              size="lg"
              colorScheme="brand"
              rightIcon={<MdArrowForward />}
              px={8}
              borderRadius="full"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 25px rgba(0, 138, 255, 0.4)',
              }}
              transition="all 0.2s"
            >
              Start for free
            </Button>
            <Button
              as="a"
              href="#pricing"
              size="lg"
              variant="outline"
              colorScheme="whiteAlpha"
              px={8}
              borderRadius="full"
              _hover={{ bg: 'whiteAlpha.100', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              View Pricing
            </Button>
          </HStack>
        </MotionVStack>

        <MotionBox
          mt={20}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          position="relative"
        >
          <Box
            borderRadius="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="0 20px 40px rgba(0,0,0,0.4)"
            position="relative"
          >
            {/* Mockup Image - using a placeholder styled nicely */}
            <Box bg="whiteAlpha.50" p={2} borderBottom="1px solid" borderColor="whiteAlpha.100">
              <HStack spacing={2}>
                <Box w={3} h={3} borderRadius="full" bg="red.400" />
                <Box w={3} h={3} borderRadius="full" bg="yellow.400" />
                <Box w={3} h={3} borderRadius="full" bg="green.400" />
              </HStack>
            </Box>
            <Box bg="#0d0d12" h="500px" w="100%" position="relative" overflow="hidden" display="flex">
              {/* Sidebar */}
              <Box w="240px" borderRight="1px solid" borderColor="whiteAlpha.100" bg="blackAlpha.300" p={4}>
                <VStack align="stretch" spacing={4}>
                  <HStack color="whiteAlpha.400" spacing={3}>
                    <Box w={6} h={6} borderRadius="md" bg="brand.500" opacity={0.8} />
                    <Text fontSize="sm" fontWeight="bold">Acme Corp</Text>
                  </HStack>
                  <VStack align="stretch" spacing={1} mt={4}>
                    {['Inbox', 'Starred', 'Sent', 'Drafts'].map((item, i) => (
                      <HStack key={i} px={3} py={2} borderRadius="md" bg={i === 0 ? 'whiteAlpha.100' : 'transparent'} color={i === 0 ? 'white' : 'whiteAlpha.600'}>
                        <Box w={4} h={4} borderRadius="sm" bg="whiteAlpha.200" />
                        <Text fontSize="sm">{item}</Text>
                      </HStack>
                    ))}
                  </VStack>
                  <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.400" mt={6} mb={2}>TEAMS</Text>
                  <VStack align="stretch" spacing={1}>
                    {['Engineering', 'Design', 'Marketing'].map((item, i) => (
                      <HStack key={i} px={3} py={2} borderRadius="md" color="whiteAlpha.600">
                        <Box w={2} h={2} borderRadius="full" bg={i === 0 ? 'green.400' : 'blue.400'} />
                        <Text fontSize="sm">{item}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>

              {/* Main Content Area */}
              <Box flex="1" display="flex" flexDirection="column">
                <HStack p={4} borderBottom="1px solid" borderColor="whiteAlpha.100" justify="space-between">
                  <HStack spacing={3}>
                   <Box h={4} w={20} bg="whiteAlpha.200" borderRadius="md" />
                   <Box h={4} w={12} bg="whiteAlpha.100" borderRadius="md" />
                  </HStack>
                  <Box w={8} h={8} borderRadius="full" bg="whiteAlpha.200" />
                </HStack>

                <Flex flex="1">
                  {/* Email List */}
                  <Box w="300px" borderRight="1px solid" borderColor="whiteAlpha.100">
                    <VStack align="stretch" spacing={0}>
                      {[1, 2, 3, 4].map((i) => (
                        <Box key={i} p={4} borderBottom="1px solid" borderColor="whiteAlpha.100" bg={i===1 ? 'whiteAlpha.50' : 'transparent'}>
                           <HStack justify="space-between" mb={1}>
                             <Text fontSize="xs" color={i===1 ? 'white' : 'whiteAlpha.600'} fontWeight="bold">John Doe</Text>
                             <Text fontSize="xs" color="whiteAlpha.400">10:42 AM</Text>
                           </HStack>
                           <Text fontSize="sm" color={i===1 ? 'brand.200' : 'whiteAlpha.800'} fontWeight="medium" isTruncated>Project Update - Q3 Roadmap</Text>
                           <Text fontSize="xs" color="whiteAlpha.500" mt={1} noOfLines={2}>Hi team, please find attached the latest roadmap changes for Q3. We are heavily prioritizing performance.</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  {/* Email View */}
                  <Box flex="1" p={6} position="relative">
                     <HStack justify="space-between" mb={6}>
                       <Heading size="md" color="white">Project Update - Q3 Roadmap</Heading>
                       <HStack>
                         <Box px={2} py={1} borderRadius="full" bg="brand.500" color="white" fontSize="xs" opacity={0.8}>Engineering</Box>
                       </HStack>
                     </HStack>

                     <HStack mb={6}>
                       <Box w={10} h={10} borderRadius="full" bg="whiteAlpha.200" />
                       <Box>
                         <HStack><Text fontSize="sm" fontWeight="bold" color="white">John Doe</Text> <Text fontSize="xs" color="whiteAlpha.500">&lt;john@acme.com&gt;</Text></HStack>
                         <Text fontSize="xs" color="whiteAlpha.400">to Engineering Team</Text>
                       </Box>
                     </HStack>

                     <VStack align="stretch" spacing={4} color="whiteAlpha.700" fontSize="sm">
                       <Box h={3} w="90%" bg="whiteAlpha.200" borderRadius="sm" />
                       <Box h={3} w="100%" bg="whiteAlpha.200" borderRadius="sm" />
                       <Box h={3} w="80%" bg="whiteAlpha.200" borderRadius="sm" />
                       <Box h={3} w="60%" bg="whiteAlpha.200" borderRadius="sm" mt={2} />
                     </VStack>

                     {/* Floating comment box */}
                     <Box position="absolute" right={8} bottom={8} w="250px" bg="#1f1f2e" p={4} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200" boxShadow="0 10px 30px rgba(0,0,0,0.5)">
                       <Text fontSize="xs" fontWeight="bold" color="brand.300" mb={2}> Sarah (PM)</Text>
                       <Text fontSize="xs" color="whiteAlpha.800" mb={3}>Looks good! Can we also include the auth refactor into sprint 2?</Text>
                       <HStack>
                         <Box flex="1" h={6} bg="whiteAlpha.100" borderRadius="md" />
                         <Box w={6} h={6} borderRadius="full" bg="brand.500" />
                       </HStack>
                     </Box>
                  </Box>
                </Flex>
              </Box>

              {/* Subtle grid pattern background overlay*/}
              <Box
                position="absolute"
                inset={0}
                opacity={0.03}
                pointerEvents="none"
                sx={{
                  backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}
