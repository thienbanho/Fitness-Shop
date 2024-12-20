import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Flex, Button, Spinner, useToast } from "@chakra-ui/react";
import { useAuth } from "../../hooks/Auth"; // Assuming you have an Auth context or hook
import supabase from "../../config/supabaseClient";

const SellerReceiptManage = () => {
  const [loading, setLoading] = useState(true);
  const [receipts, setReceipts] = useState([]);
  const { user } = useAuth();
  const toast = useToast();

  const fetchUserId = async (email) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", email)
        .single();

      if (error) {
        toast({
          title: "Error fetching user ID",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return null;
      }

      return data?.user_id;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
  };

  const fetchReceipts = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("receipts")
        .select(`
          receipt_id,
          total,
          created_date,
          status,
          receipt_items(
            item_id,
            quantity,
            price,
            total,
            status,
            product_id,
            products (
              product_id,
              name,
              seller_id,
              price
            )
          )
        `)
        // Ensure that the seller_id from products matches the userId
        .eq("receipt_items.products.seller_id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      toast({
        title: "Error fetching receipts",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return [];
    }
  };

  const updateItemStatus = async (itemId, newStatus) => {
    try {
      const { error } = await supabase
        .from("receipt_items")
        .update({ status: newStatus })
        .eq("item_id", itemId);

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Status updated",
        description: `Item status updated to ${newStatus}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      const userId = await fetchUserId(user.email);
      const updatedReceipts = await fetchReceipts(userId);
      setReceipts(updatedReceipts);
    } catch (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) {
        return; // Ensure user is available before fetching data
      }

      setLoading(true);
      const userId = await fetchUserId(user.email);
      if (userId) {
        const data = await fetchReceipts(userId);
        setReceipts(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box bg="gray.100" minH="100vh" p={5}>
      <Heading fontSize="2xl" color="gray.700" mb={4}>
        Manage Receipts
      </Heading>

      {receipts.length > 0 ? (
        <VStack spacing={8} align="start">
          {receipts.map((receipt) => (
            <Box key={receipt.receipt_id} bg="white" p={6} borderRadius="md" boxShadow="lg" width="100%" maxW="700px">
              <Text fontSize="lg" color="gray.700">Receipt ID: {receipt.receipt_id}</Text>
              <Text color="gray.500">Total: ${receipt.total}</Text>
              <Text color="gray.500">Status: {receipt.status}</Text>

              <VStack mt={4} spacing={4} align="start">
                {receipt.receipt_items.map((item) => {
                  const product = item.products;
                  if (product && product.seller_id === user.user_id) {
                    return (
                      <Box key={item.item_id} borderWidth="1px" borderRadius="md" p={4} width="100%">
                        <Text fontSize="md" color="gray.700">
                          Product: {product.name}
                        </Text>
                        <Text color="gray.500">Quantity: {item.quantity}</Text>
                        <Text color="gray.500">Price: ${item.price}</Text>
                        <Text color="gray.500">Item Status: {item.status}</Text>
                        <Flex mt={2}>
                          <Button size="sm" colorScheme="blue" onClick={() => updateItemStatus(item.item_id, "Delivered")}>
                            Delivered
                          </Button>
                          <Button size="sm" colorScheme="red" ml={2} onClick={() => updateItemStatus(item.item_id, "Canceled")}>
                            Canceled
                          </Button>
                          <Button size="sm" colorScheme="green" ml={2} onClick={() => updateItemStatus(item.item_id, "Successful")}>
                            Successful
                          </Button>
                        </Flex>
                      </Box>
                    );
                  }
                  return null;
                })}
              </VStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <Flex justify="center" align="center" minH="300px">
          <Text fontSize="xl" color="gray.600">No receipts found for your products.</Text>
        </Flex>
      )}
    </Box>
  );
};

export default SellerReceiptManage;
