'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdStar, MdStarHalf } from 'react-icons/md'
import Marquee from 'react-fast-marquee'
// REMOVE HERE
const reviews = [
  {
    name: 'Sarah Jenkins',
    role: 'Product Manager',
    content: "EmailShare completely changed how our team communicates. We no longer have to forward massive email chains. Real-time comments are a game changer.",
    avatar: 'https://bit.ly/dan-abramov',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Lead Engineer',
    content: "The advanced search is actually lightning fast, exactly as they promised. I can find any bug report from a client within seconds.",
    avatar: 'https://bit.ly/kent-c-dodds',
    rating: 4.5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Marketing',
    content: "We use the team channels to organize all our campaign approvals. It's incredibly easy to tag a designer on an email so they can pull assets.",
    avatar: 'https://bit.ly/ryan-florence',
    rating: 5,
  },
  {
    name: 'Michael Chang',
    role: 'Startup Founder',
    content: "Affordable and getting better every week. Solid tool but still missing a couple of enterprise features. Overall, solid 4 stars.",
    avatar: 'https://bit.ly/code-beast',
    rating: 4,
  },
  {
    name: 'Jessica Alba',
    role: 'Senior Designer',
    content: "UI is very sleek. Sometimes notifications get delayed by a few minutes, but it's a huge step up from standard email clients.",
    avatar: 'https://bit.ly/sage-adebayo',
    rating: 3.5,
  },
  {
    name: 'Robert Simmons',
    role: 'Director of Operations',
    content: "Excellent product. We migrated 50+ users without a single hiccup. The support team is incredibly responsive.",
    avatar: 'https://bit.ly/prosper-baba',
    rating: 5,
  },
  {
    name: 'Amanda Lewis',
    role: 'Customer Success Manager',
    content: "Being able to see if a teammate has already replied to a client has saved us so much embarrassment. We love the shared inboxes.",
    avatar: 'https://bit.ly/dan-abramov',
    rating: 5,
  },
  {
    name: 'Tyler Johnson',
    role: 'Support Specialist',
    content: "Overall works wonderfully for my small support team. Assigning a complicated email thread entirely to tier 2 support is just a single click away.",
    avatar: 'https://bit.ly/kent-c-dodds',
    rating: 4,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <HStack spacing={1} mb={4}>
      {[...Array(5)].map((_, i) => {
        let StarIcon = MdStar;
        let starBg = "#00b67a";
        let opacity = 1;
        
        if (i + 1 <= rating) {
          StarIcon = MdStar;
        } else if (i + 0.5 <= rating) {
          StarIcon = MdStarHalf;
        } else {
          StarIcon = MdStar;
          starBg = "whiteAlpha.200"; 
          opacity = 0.3;
        }

        return (
          <Box key={i} bg={starBg} p={0.5} borderRadius="sm">
            <Icon as={StarIcon} w={3} h={3} color="white" opacity={opacity} />
          </Box>
        )
      })}
    </HStack>
  )
}

export default function TrustpilotReviews() {
  const cardBg = useColorModeValue('whiteAlpha.50', 'whiteAlpha.50')
  const borderColor = useColorModeValue('whiteAlpha.200', 'whiteAlpha.200')

  return (
    <Box py={{ base: 20, md: 32 }} position="relative" bg="blackAlpha.300" overflow="hidden">
      <Container maxW="container.xl" mb={16}>
        <VStack spacing={4} textAlign="center">
          <HStack justify="center" spacing={2} mb={2}>
            {[...Array(5)].map((_, i) => (
              <Box key={i} bg="#00b67a" p={1} borderRadius="sm">
                <Icon as={MdStar} w={6} h={6} color="white" />
              </Box>
            ))}
          </HStack>
          <Text fontSize="lg" fontWeight="medium" color="whiteAlpha.800">
            Excellent <Text as="span" fontWeight="bold">4.7 out of 5</Text>
          </Text>
          <HStack justify="center" spacing={1}>
            <Icon as={MdStar} color="#00b67a" w={5} h={5} />
            <Text fontWeight="bold" fontSize="xl" letterSpacing="tight">
              Trustpilot
            </Text>
          </HStack>
          
          <Heading size="2xl" mt={6} maxW="2xl" lineHeight="1.2">
            Trusted by teams worldwide
          </Heading>
        </VStack>
      </Container>

      <Box width="100%" position="relative">
        <Box 
          position="absolute" 
          left={0} top={0} w={{ base: "40px", md: "150px" }} h="100%" 
          bgGradient="linear(to-r, blackAlpha.300, transparent)" 
          zIndex={2} pointerEvents="none" 
        />
        <Box 
          position="absolute" 
          right={0} top={0} w={{ base: "40px", md: "150px" }} h="100%" 
          bgGradient="linear(to-l, blackAlpha.300, transparent)" 
          zIndex={2} pointerEvents="none" 
        />
        
        <Marquee speed={40} pauseOnHover={true} gradient={false}>
          <HStack spacing={6} py={4} pr={6}>
            {reviews.map((review, index) => (
              <Box
                key={index}
                bg={cardBg}
                borderRadius="2xl"
                p={8}
                border="1px solid"
                borderColor={borderColor}
                w="400px"
                h="280px"
                display="flex"
                flexDirection="column"
                transition="all 0.3s"
                _hover={{
                  bg: 'whiteAlpha.100',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
              >
                <StarRating rating={review.rating} />
                <Text fontSize="md" color="whiteAlpha.800" mb={8} lineHeight="1.6" fontStyle="italic" noOfLines={4}>
                  "{review.content}"
                </Text>

                <HStack spacing={4} mt="auto">
                  <Avatar name={review.name} size="md" bg="white" color="gray.800" />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" color="white">{review.name}</Text>
                    <Text fontSize="sm" color="whiteAlpha.500">{review.role}</Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </HStack>
        </Marquee>
      </Box>
    </Box>
  )
}
