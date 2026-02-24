"use client";

import {
  Box,
  Flex,
  HStack,
  Button,
  Heading,
  Spacer,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      as="nav"
      bg={bg}
      px={6}
      py={3}
      borderBottomWidth="1px"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center" maxW="7xl" mx="auto">
        <Heading
          size="md"
          cursor="pointer"
          onClick={() => router.push("/dashboard")}
          color="brand.500"
        >
          📧 EmailShare
        </Heading>
        <Spacer />
        {user && (
          <HStack spacing={4}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/teams")}
            >
              Teams
            </Button>
            <Menu>
              <MenuButton>
                <Avatar size="sm" name={user.name} />
              </MenuButton>
              <MenuList>
                <MenuItem fontSize="sm" isDisabled>
                  {user.email}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
