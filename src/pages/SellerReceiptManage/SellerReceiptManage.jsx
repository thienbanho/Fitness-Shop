import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Spinner,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/Auth";
import supabase from "../../config/supabaseClient";

const SellerReceiptManage = () => {
  const [loading, setLoading] = useState(true);
  const [receipts, setReceipts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(""); // Status filter
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
          receipt_items:receipt_items (
            item_id,
            quantity,
            price,
            total,
            status,
            product_id,
            products:products (
              name,
              seller_id
            )
          )
        `)
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

  const updateItemStatus = async (itemId, newStatus, productId, quantity) => {
    try {
      const { error: updateError } = await supabase
        .from("receipt_items")
        .update({ status: newStatus })
        .eq("item_id", itemId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      if (newStatus === "Successful") {
        const { data: productData, error: stockError } = await supabase
          .from("products")
          .select("stock")
          .eq("product_id", productId)
          .single();

        if (stockError) {
          throw new Error(stockError.message);
        }

        const currentStock = productData?.stock || 0;
        const newStock = currentStock - quantity;

        const { error: updateStockError } = await supabase
          .from("products")
          .update({ stock: newStock })
          .eq("product_id", productId);

        if (updateStockError) {
          throw new Error(updateStockError.message);
        }
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
        return;
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

  const handleStatusFilterChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const calculateReceiptStatus = (items) => {
    const allStatuses = items.map((item) => item.status);

    if (allStatuses.every((status) => status === "Successful")) {
      return "Successful";
    } else if (allStatuses.every((status) => status === "Delivered" || status === "Successful")) {
      return "Delivered";
    } else if (allStatuses.every((status) => status === "Cancel")) {
      return "Cancel";
    } else {
      return "Pending";
    }
  };

  const filteredReceipts = receipts
    .map((receipt) => ({
      ...receipt,
      status: calculateReceiptStatus(receipt.receipt_items),
    }))
    .filter((receipt) => {
      return selectedStatus === "" || receipt.status === selectedStatus;
    });

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

      {/* Status filter dropdown */}
      <Select
        placeholder="Filter by status"
        value={selectedStatus}
        onChange={handleStatusFilterChange}
        mb={4}
      >
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Successful">Successful</option>
        <option value="Cancel">Cancel</option>
      </Select>

      {filteredReceipts.length > 0 ? (
        <VStack spacing={8} align="start">
          {filteredReceipts.map((receipt) => (
            <Box
              key={receipt.receipt_id}
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="lg"
              width="100%"
              maxW="700px"
            >
              <Text fontSize="lg" color="gray.700">
                Receipt ID: {receipt.receipt_id}
              </Text>
              <Text color="gray.500">Total: ${receipt.total}</Text>
              <Text color="gray.500">Status: {receipt.status}</Text>

              <VStack align="start" mt={4} spacing={2}>
                {receipt.receipt_items.map((item) => (
                  <Box key={item.item_id}>
                    <Text color="gray.600">
                      Product: {item.products?.name || "Unknown Product"} (Quantity: {item.quantity})
                    </Text>
                    <Text color="gray.600">Item Total: ${item.total}</Text>
                    <Select
                      mt={2}
                      placeholder="Change status"
                      value={item.status}
                      onChange={(e) =>
                        updateItemStatus(item.item_id, e.target.value, item.product_id, item.quantity)
                      }
                      isDisabled={item.status === "Successful"}
                    >
                      <option value="Cancel">Cancel</option>
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Successful">Successful</option>
                    </Select>
                  </Box>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <Flex justify="center" align="center" minH="300px">
          <Text fontSize="xl" color="gray.600">
            No receipts found for your products.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default SellerReceiptManage;
