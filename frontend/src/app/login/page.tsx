"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import NextLink from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      toast({ title: err.message, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center">
      <Container maxW="sm">
        <Box bg="white" p={8} rounded="xl" shadow="lg">
          <Heading size="lg" mb={6} textAlign="center" color="brand.500">
            Log In
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="brand"
                w="full"
                isLoading={loading}
              >
                Log In
              </Button>
            </VStack>
          </form>
          <Text mt={4} textAlign="center" fontSize="sm">
            Don&apos;t have an account?{" "}
            <ChakraLink as={NextLink} href="/register" color="brand.500">
              Register
            </ChakraLink>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
