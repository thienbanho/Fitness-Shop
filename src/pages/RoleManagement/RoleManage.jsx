import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Heading,
  Center,
  useToast,
  Input,
  Checkbox,
  Text,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import supabase from "../../config/supabaseClient";

const RoleManage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error, count } = await supabase
          .from("users")
          .select("user_id, username, role", { count: "exact" })
          .ilike("username", `%${search}%`)
          .range((currentPage - 1) * usersPerPage, currentPage * usersPerPage - 1);

        if (error) {
          throw error;
        }

        console.log("Fetched users:", data);
        setUsers(data);
        setTotalPages(Math.ceil(count / usersPerPage));
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error fetching users.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUsers();
  }, [search, currentPage, toast]);

  const handleUserChange = (userId) => {
    setSelectedUserId(userId);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedUserId || !role) {
      toast({
        title: "Missing fields.",
        description: "Please select a user and a role.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({ role })
        .eq("user_id", selectedUserId);

      if (error) {
        console.error("Error updating role:", error);
        throw error;
      }

      toast({
        title: "Role updated.",
        description: "The user's role has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setSelectedUserId(null);
    } catch (error) {
      console.error("Error during role update:", error);
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center>
      <VStack spacing={6} w="full" maxW="md">
        <Heading as="h1" size="lg">
          Manage User Role
        </Heading>

        <FormControl id="search">
          <FormLabel>Search Users</FormLabel>
          <Input
            placeholder="Search by username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>

        <FormControl id="username">
          <FormLabel>Select User</FormLabel>
          <SimpleGrid columns={1} spacing={2}>
            {users.map((user) => (
              <Checkbox
                key={user.user_id}
                isChecked={selectedUserId === user.user_id}
                onChange={() => handleUserChange(user.user_id)}
              >
                <Text>{user.username}</Text>
              </Checkbox>
            ))}
          </SimpleGrid>
        </FormControl>

        <FormControl id="role">
          <FormLabel>Select Role</FormLabel>
          <Select placeholder="Select role" value={role} onChange={handleRoleChange}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="vendor">Vendor</option>
            <option value="pt">Personal Trainer</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Update Role
        </Button>

        <HStack spacing={4} justify="space-between" w="full">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default RoleManage;
