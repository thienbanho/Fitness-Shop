"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  HStack,
  Select
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/Auth"; // Import useAuth hook
import supabase from "../../config/supabaseClient";
import Navbar from "../../components/NavBar/NavBar"; // Navbar Component
import Footer from "../../components/Footer/Footer"; // Footer Component
import Sidebar from "../../components/Sidebar/Sidebar"; // Sidebar Component

export default function Profile() {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    dob: "",
    gender: "",
    address: "",
    user_id: "",
    updated_at: "",
    balance: "", // Add balance to formData
  });
  const toast = useToast();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch user data from Supabase
  useEffect(() => {
    if (user) {
      console.log("Current user:", user);
      const fetchUserData = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email); // Assuming balance is stored in 'users' table

        if (error) {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error fetching user data",
            description: error.message,
            status: "error",
            duration: 3000,
          });
        } else if (data && data.length > 0) {
          console.log("Fetched user data:", data[0]);
          setUserData(data[0]);
          setFormData({
            full_name: data[0].full_name || "",
            email: data[0].email || "",
            phone_number: data[0].phone_number || "",
            dob: data[0].dob || "",
            gender: data[0].gender || "",
            address: data[0].address || "",
            user_id: data[0].user_id || "",
            balance: data[0].balance || "0", // Store balance in formData
          });
        } else {
          console.log("No user data found");
          toast({
            title: "No user data found",
            status: "warning",
            duration: 3000,
          });
        }
      };

      fetchUserData();
    }
  }, [user, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from("users")
      .update({
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        updated_at: new Date(),
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
      })
      .eq("user_id", formData.user_id);

    if (error) {
      toast({
        title: "Error updating profile",
        status: "error",
        duration: 3000,
      });
    } else {
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
      });
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <Container centerContent py={6}>
        <Text>You need to log in to see your profile.</Text>
      </Container>
    );
  }

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Navbar */}
      <Box as="header" width="100%" position="fixed" top="0" zIndex="10">
        <Navbar />
      </Box>

      <Container maxW="container.xl" py={40}>
        <Flex gap={8}>
          {/* Sidebar */}
          <Sidebar userData={userData} onLogout={handleLogout} />

          {/* Main Content */}
          <Box flex={1} bg="white" p={8} borderRadius="md" shadow="sm">
            <Box mb={6}>
              <Text fontSize="2xl" fontWeight="bold">
                Account Information
              </Text>
            </Box>

            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={user.email} disabled bg="gray.50" />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <HStack spacing={4}>
                  {/* Date of Birth Input */}
                  <Box flex={1}>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Box>

                  {/* Gender */}
                  <Box flex={1}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      placeholder="Select your gender"
                    >
                      <option value="true">Men</option>
                      <option value="false">Women</option>
                    </Select>
                  </Box>
                </HStack>
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </FormControl>

              {/* Balance (Read-Only) */}
              <FormControl>
                <FormLabel>Balance</FormLabel>
                <Input value={formData.balance} isReadOnly bg="gray.50" />
              </FormControl>

              <Box>
                {isEditing ? (
                  <Flex gap={4}>
                    <Button colorScheme="blue" onClick={handleUpdateProfile}>
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </Flex>
                ) : (
                  <Button colorScheme="red" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Container>

      {/* Footer */}
      <Box as="footer" width="100%" bg="black" color="white" py="4">
        <Footer />
      </Box>
    </Flex>
  );
}
