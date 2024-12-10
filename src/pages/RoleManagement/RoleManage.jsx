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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

const RoleManage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [role, setRole] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("user_id, username, role");

        if (error) {
          throw error;
        }

        setUsers(data);
      } catch (error) {
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
  }, [toast]);

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
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
        throw error;
      }

      toast({
        title: "Role updated.",
        description: "The user's role has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
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

        <FormControl id="username">
          <FormLabel>Select User</FormLabel>
          <Select placeholder="Select user" value={selectedUserId} onChange={handleUserChange}>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.username}
              </option>
            ))}
          </Select>
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
      </VStack>
    </Center>
  );
};

export default RoleManage;
