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
    phone: "",
  });
  const toast = useToast();

  // Fetch user data from Supabase
  useEffect(() => {
    if (user) {
      console.log("Current user:", user);
      const fetchUserData = async () => {
        if (error) {
          console.log("Error fetching user data:", error);
          toast({
            title: "Error fetching user data",
            status: "error",
            duration: 3000,
          });
        } else {
          setUserData(user);
          setFormData({
            full_name: user.full_name || "",
            email: user.email || "",
            phone: user.phone || "",
          });
        }
      };

      fetchUserData();
    }
  }, [user, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from("users")
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        updated_at: new Date(),
      })
      .eq("id", user?.id);

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
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
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
