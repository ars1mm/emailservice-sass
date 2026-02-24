"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { FiMail, FiUsers, FiTag } from "react-icons/fi";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="brand.500" color="white" py={20}>
        <Container maxW="4xl" textAlign="center">
          <Heading size="2xl" mb={4}>
            📧 EmailShare
          </Heading>
          <Text fontSize="xl" mb={8} opacity={0.9}>
            The simplest way to share important emails across your teams.
            Engineers, designers, PMs — everyone stays in the loop.
          </Text>
          <HStack justify="center" spacing={4}>
            <Button
              size="lg"
              colorScheme="whiteAlpha"
              onClick={() => router.push("/register")}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="white"
              borderColor="white"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={() => router.push("/login")}
            >
              Log In
            </Button>
          </HStack>
        </Container>
      </Box>

      <Container maxW="5xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <VStack
            p={8}
            bg="white"
            rounded="xl"
            shadow="md"
            textAlign="center"
          >
            <Icon as={FiMail} boxSize={10} color="brand.500" />
            <Heading size="md">Share Emails</Heading>
            <Text color="gray.600">
              Paste any email and share it with your team in seconds. Subject,
              sender, body — all preserved.
            </Text>
          </VStack>
          <VStack
            p={8}
            bg="white"
            rounded="xl"
            shadow="md"
            textAlign="center"
          >
            <Icon as={FiUsers} boxSize={10} color="brand.500" />
            <Heading size="md">Team Channels</Heading>
            <Text color="gray.600">
              Create teams for engineering, design, product — keep emails
              organized by audience.
            </Text>
          </VStack>
          <VStack
            p={8}
            bg="white"
            rounded="xl"
            shadow="md"
            textAlign="center"
          >
            <Icon as={FiTag} boxSize={10} color="brand.500" />
            <Heading size="md">Tag & Search</Heading>
            <Text color="gray.600">
              Tag emails as urgent, FYI, action-required, or custom labels.
              Full-text search included.
            </Text>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
