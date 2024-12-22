import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Text,
    Heading,
    Button,
    useToast,
    Spinner,
    Divider,
    Center,
} from "@chakra-ui/react";
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth";

const ReceiptList = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const { user } = useAuth();

    const fetchUserId = async (email) => {
        const { data, error } = await supabase
            .from("users")
            .select("user_id")
            .eq("email", email)
            .single();

        if (error) {
            toast({
                title: "Error",
                description: "Failed to fetch user details. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return null;
        }
        return data?.user_id;
    };

    const calculateNewStatus = async (receiptId) => {
        try {
            // Fetch all items for the receipt
            const { data: items, error: itemsError } = await supabase
                .from("receipt_items")
                .select("status")
                .eq("receipt_id", receiptId);

            if (itemsError) {
                throw new Error(itemsError.message);
            }

            if (items.length === 0) return null; // No items found for the receipt

            // Determine if all items have the same status
            const allCancelled = items.every((item) => item.status === "Cancel");
            const allDelivered = items.every((item) => item.status === "Delivered");
            const allSuccessful = items.every((item) => item.status === "Successful");

            if (allDelivered) {
                return "Delivered";
            } else if (allSuccessful) {
                return "Successful";
            } else if (allCancelled) {
                return "Cancelled";
            } else

            return "Pending"; // Default status if neither condition is met
        } catch (error) {
            toast({
                title: "Error calculating receipt status",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return null;
        }
    };

    const fetchReceipts = async () => {
        try {
            // Fetch the user_id first
            const userId = await fetchUserId(user.email);
            if (!userId) return;

            // Fetch all receipts for the current user
            const { data: receiptsData, error: receiptsError } = await supabase
                .from("receipts")
                .select("*")
                .eq("user_id", userId);

            if (receiptsError) {
                throw new Error(receiptsError.message);
            }

            // Calculate new status for each receipt
            const receiptsWithStatus = await Promise.all(
                receiptsData.map(async (receipt) => {
                    const newStatus = await calculateNewStatus(receipt.receipt_id);
                    return { ...receipt, newStatus };
                })
            );

            setReceipts(receiptsWithStatus);
        } catch (error) {
            toast({
                title: "Error fetching receipts",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchReceipts();
    }, [user, toast]);

    if (loading) {
        return (
            <Center>
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <VStack spacing={4} align="stretch">
            <Heading>Receipts</Heading>
            {receipts.length > 0 ? (
                receipts.map((receipt) => (
                    <Box key={receipt.receipt_id} p={4} shadow="md" borderWidth="1px">
                        <Text>Receipt ID: {receipt.receipt_id}</Text>
                        <Text>Total: ${receipt.total}</Text>
                        <Text>Payment Method: {receipt.payment_method}</Text>
                        <Text>Shipping Address: {receipt.shipping_address}</Text>
                        <Text>Status: {receipt.newStatus || "Pending"}</Text>
                        <Divider my={2} />
                        <Button
                            colorScheme="teal"
                            size="sm"
                            onClick={() => {
                                // Navigate to the ReceiptConfirm page with the receipt_id as a query parameter
                                window.location.href = `/ReceiptConfirm?receipt_id=${receipt.receipt_id}`;
                            }}
                        >
                            View Receipt
                        </Button>
                    </Box>
                ))
            ) : (
                <Text>No receipts found</Text>
            )}
        </VStack>
    );
};

export default ReceiptList;
