import { Box, Flex, Link, VStack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      as="aside"
      position="fixed"
      left="0"
      top="0"
      w="250px"
      h="100vh"
      bg="teal.500"
      color="white"
      p="20px"
    >
      <Text fontSize="xl" fontWeight="bold" mb="20px">
        Sidebar
      </Text>
      <VStack align="start" spacing="15px">
        <Link as={RouterLink} to="/" fontWeight="bold" _hover={{ color: "gray.300" }}>
          Home
        </Link>
        <Link as={RouterLink} to="/dashboard" fontWeight="bold" _hover={{ color: "gray.300" }}>
          Dashboard
        </Link>
        <Link as={RouterLink} to="/profile" fontWeight="bold" _hover={{ color: "gray.300" }}>
          Profile
        </Link>
        <Link as={RouterLink} to="/settings" fontWeight="bold" _hover={{ color: "gray.300" }}>
          Settings
        </Link>
      </VStack>
    </Box>
  );
}
