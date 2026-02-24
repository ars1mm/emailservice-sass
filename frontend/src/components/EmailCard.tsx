"use client";

import {
  Box,
  Badge,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  email: {
    id: string;
    subject: string;
    sender: string;
    body: string;
    tag: string;
    created_at: string;
    shared_by_user?: { name: string } | null;
  };
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

const tagColors: Record<string, string> = {
  general: "gray",
  urgent: "red",
  fyi: "blue",
  "action-required": "orange",
  bug: "purple",
  feature: "green",
};

export default function EmailCard({ email, onDelete, canDelete }: Props) {
  const bg = useColorModeValue("white", "gray.700");

  return (
    <Box p={5} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
      <HStack justify="space-between" mb={2}>
        <HStack>
          <Heading size="sm">{email.subject}</Heading>
          <Badge colorScheme={tagColors[email.tag] || "gray"}>
            {email.tag}
          </Badge>
        </HStack>
        {canDelete && onDelete && (
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(email.id)}
          />
        )}
      </HStack>
      <Text fontSize="sm" color="gray.500" mb={1}>
        From: {email.sender} · Shared by{" "}
        {email.shared_by_user?.name ?? "unknown"} ·{" "}
        {new Date(email.created_at).toLocaleDateString()}
      </Text>
      <Text fontSize="sm" whiteSpace="pre-wrap" noOfLines={6}>
        {email.body}
      </Text>
    </Box>
  );
}
