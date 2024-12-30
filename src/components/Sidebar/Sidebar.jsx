import React, { useEffect, useState } from "react";
import { Box, VStack, Link, Divider, Button, Text, Avatar } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import supabase from '../../config/supabaseClient';
import { useAuth } from "../../hooks/Auth"; // Import useAuth hook

const Sidebar = ({ userData, onLogout }) => {
  const location = useLocation();
  const { user, setUser } = useAuth();

  const [userRole, setUserRole] = useState();

  useEffect(() => {
    if (user) {
      console.log("Current user:", user);
      const isEligible = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email);

        if (error) {
          console.error("Error fetching data:", error);
          alert("An error occurred while fetching user data.");
          return;
        }
        setUserRole(data[0].role);
      }
      isEligible();
    }
  }, [user]);
  console.log("role:", userRole);

  const linkStyles = (path) => ({
    fontWeight: location.pathname === path ? "bold" : "medium",
    color: location.pathname === path ? "black" : "gray.600",
  });

  return (
    <Box w="300px" bg="gray.50" p={6} borderRadius="md">
      <VStack spacing={6} align="stretch">
        {/* User Info */}
        <Box textAlign="center">
          <Avatar size="xl" name={userData?.full_name} mb={4} />
          <Text fontSize="lg" fontWeight="bold">
            {userData?.full_name}
          </Text>
          <Text color="gray.600">{userData?.email}</Text>
        </Box>

        <Divider />

        {/* Navigation Links */}
        <VStack align="stretch" spacing={3}>
          <NavLink to="/profile" style={linkStyles("/profile")}>
            Account Information
          </NavLink>
          {/*
          <NavLink to="/profile/orders" style={linkStyles("/profile/orders")}>
            List of Orders
          </NavLink>
          {userRole === "pt" || userRole === "admin" ? (
            <NavLink to="/PTContracts" style={linkStyles("/PTContracts")}>
              Your Contracts
            </NavLink>
          ) : (
            <NavLink to="/profile/PTRegistration" style={linkStyles("/profile/PTRegistration")}>
              PT Registration
            </NavLink>
          )}
          <NavLink to="/profile/coupon-wallet" style={linkStyles("/profile/coupon-wallet")}>
            Coupon Wallet
          </NavLink>
          */}
          <Button variant="outline" colorScheme="red" onClick={onLogout}>
            Sign Out
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
