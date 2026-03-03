'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { MdCheckCircle } from 'react-icons/md'
import { siteConfig } from '@/config/site'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const MotionBox = motion(Box)

const IS_TEST_MODE = process.env.NEXT_PUBLIC_TEST_MODE === 'true'
console.log(
  'TEST MODE:',
  IS_TEST_MODE,
  'ENV:',
  process.env.NEXT_PUBLIC_TEST_MODE
)

// Map display plan names to API plan names
const PLAN_MAP: Record<string, string> = {
  Free: 'starter',
  Company: 'pro',
  Enterprise: 'enterprise',
}

interface PricingProps {
  title: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  buttonText: string
  buttonVariant: 'solid' | 'outline'
}

function PricingCard({
  title,
  price,
  description,
  features,
  isPopular,
  buttonText,
  buttonVariant,
}: PricingProps) {
  const bg = useColorModeValue('whiteAlpha.50', 'whiteAlpha.50')
  const borderColor = isPopular
    ? 'brand.400'
    : useColorModeValue('whiteAlpha.200', 'whiteAlpha.200')
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (IS_TEST_MODE) {
      setLoading(true)
      const priceId = getPriceId(title)

      if (!priceId) {
        toast({
          title: 'Configuration Error',
          description: 'Price ID not configured for this plan.',
          status: 'error',
        })
        setLoading(false)
        return
      }

      console.log('Creating checkout for price:', priceId)

      try {
        const Paddle = (window as any).Paddle
        if (!Paddle) {
          toast({
            title: 'Checkout Error',
            description: 'Paddle is not loaded yet. Please try again.',
            status: 'error',
          })
          return
        }

        // Open inline overlay checkout with user context.
        // custom_data is forwarded to webhooks so the backend can
        // link the payment to the correct user.
        Paddle.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          customer: user?.email ? { email: user.email } : undefined,
          customData: {
            user_id: user?.id ?? '',
            email: user?.email ?? '',
          },
        })
      } catch (error) {
        console.error('Checkout error:', error)
        toast({
          title: 'Checkout Error',
          description: 'Failed to open checkout',
          status: 'error',
        })
      } finally {
        setLoading(false)
      }
    } else {
      window.location.href = `${siteConfig.dashboardUrl}/register`
    }
  }

  const getPriceId = (planTitle: string) => {
    const priceIds: Record<string, string> = {
      Free: process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID || '',
      Company: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID || '',
      Enterprise: process.env.NEXT_PUBLIC_PADDLE_ENTERPRISE_PRICE_ID || '',
    }
    return priceIds[planTitle]
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      w="100%"
      maxW="md"
      h="100%"
      display="flex"
      flexDirection="column"
      bg={bg}
      borderRadius="3xl"
      p={8}
      position="relative"
      border="1px solid"
      borderColor={borderColor}
      boxShadow={
        isPopular
          ? '0 0 30px rgba(0, 138, 255, 0.2)'
          : '0 4px 6px rgba(0,0,0,0.1)'
      }
      overflow="hidden"
      _before={
        isPopular
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              bg: 'brand.400',
            }
          : {}
      }
    >
      {isPopular && (
        <Box
          position="absolute"
          top={4}
          right={4}
          bg="brand.500"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          px={3}
          py={1}
          borderRadius="full"
          textTransform="uppercase"
        >
          Most Popular
        </Box>
      )}

      <VStack align="flex-start" spacing={4} mb={8} mt={isPopular ? 6 : 0}>
        <Heading size="md" color={isPopular ? 'brand.400' : 'whiteAlpha.800'}>
          {title}
        </Heading>
        <Flex align="baseline">
          <Text fontSize="5xl" fontWeight="extrabold" lineHeight="1">
            {price}
          </Text>
          {price !== 'Custom' && (
            <Text fontSize="lg" color="whiteAlpha.500" ml={2}>
              /month
            </Text>
          )}
        </Flex>
        <Text color="whiteAlpha.600">{description}</Text>
      </VStack>

      <List spacing={4} mb={8} flex="1">
        {features.map((feature, index) => (
          <ListItem key={index} display="flex" alignItems="flex-start">
            <Icon
              as={MdCheckCircle}
              color="brand.400"
              mt={1}
              mr={3}
              w={5}
              h={5}
              flexShrink={0}
            />
            <Text color="whiteAlpha.800">{feature}</Text>
          </ListItem>
        ))}
      </List>

      <Button
        onClick={handleClick}
        isLoading={loading}
        w="100%"
        size="lg"
        colorScheme={buttonVariant === 'solid' ? 'brand' : 'whiteAlpha'}
        variant={buttonVariant}
        color={buttonVariant === 'outline' ? 'white' : 'white'}
        borderColor={
          buttonVariant === 'outline' ? 'whiteAlpha.400' : 'transparent'
        }
        borderRadius="full"
        mt="auto"
        _hover={{
          bg: buttonVariant === 'outline' ? 'whiteAlpha.100' : 'brand.400',
          transform: 'translateY(-2px)',
          boxShadow:
            buttonVariant === 'solid'
              ? '0 10px 20px rgba(0, 138, 255, 0.3)'
              : 'none',
        }}
        transition="all 0.2s"
      >
        {IS_TEST_MODE ? `🧪 Test ${PLAN_MAP[title] || title}` : buttonText}
      </Button>

      {/* Decorative gradient blur */}
      {isPopular && (
        <Box
          position="absolute"
          top="-20%"
          left="-20%"
          w="100%"
          h="100%"
          bg="brand.400"
          filter="blur(150px)"
          opacity={0.1}
          pointerEvents="none"
          zIndex={-1}
        />
      )}
    </MotionBox>
  )
}

export default function Pricing() {
  return (
    <Box py={{ base: 20, md: 32 }} id="pricing" position="relative">
      <Container maxW="container.xl">
        <VStack spacing={4} textAlign="center" mb={16}>
          <Text
            color="brand.400"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            fontSize="sm"
          >
            Pricing
          </Text>
          <Heading size="3xl" maxW="2xl" lineHeight="1.2">
            Simple, transparent pricing
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.600" maxW="2xl" mx="auto">
            Choose the perfect plan for your team&apos;s needs.
          </Text>
          {IS_TEST_MODE && (
            <Badge
              colorScheme="yellow"
              fontSize="md"
              px={4}
              py={2}
              borderRadius="full"
              variant="subtle"
            >
              🧪 TEST MODE — Click any plan to instantly activate
            </Badge>
          )}
        </VStack>

        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: 8, lg: 10 }}
          justify="center"
          align="center"
        >
          <PricingCard
            title="Free"
            price="$0"
            description="Perfect for small teams getting started with email collaboration."
            features={[
              'Up to 5 team members (seats)',
              '30-day email retention',
              'Basic search & tagging',
              'Standard support',
            ]}
            buttonText="Get Started Free"
            buttonVariant="outline"
          />
          <PricingCard
            title="Company"
            price="$9.99"
            description="Our most popular plan for growing teams and startups."
            features={[
              'Up to 20 team members (seats)',
              'Unlimited email retention',
              'Advanced permissions & analytics',
              'Priority support',
            ]}
            isPopular
            buttonText="Start Free Trial"
            buttonVariant="solid"
          />
          <PricingCard
            title="Enterprise"
            price="$0.85"
            description="Pay per seat for large organizations and specific needs."
            features={[
              'Unlimited team members',
              'Price is per seat / month',
              'Dedicated account manager',
              'Custom SLAs & SSO',
            ]}
            buttonText="Contact Sales"
            buttonVariant="outline"
          />
        </Stack>
      </Container>
    </Box>
  )
}
