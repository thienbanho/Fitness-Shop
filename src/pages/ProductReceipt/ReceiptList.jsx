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
    Select,
} from "@chakra-ui/react";
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth";

const ReceiptList = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState(""); // New state for status filter
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
            const { data: items, error: itemsError } = await supabase
                .from("receipt_items")
                .select("status")
                .eq("receipt_id", receiptId);

            if (itemsError) {
                throw new Error(itemsError.message);
            }

            if (items.length === 0) return null;

            const allCancelled = items.every((item) => item.status === "Cancel");
            const allDelivered = items.every((item) => item.status === "Delivered");
            const allSuccessful = items.every((item) => item.status === "Successful");

            if (allDelivered) {
                return "Delivered";
            } else if (allSuccessful) {
                return "Successful";
            } else if (allCancelled) {
                return "Cancelled";
            }

            return "Pending";
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
            const userId = await fetchUserId(user.email);
            if (!userId) return;

            const { data: receiptsData, error: receiptsError } = await supabase
                .from("receipts")
                .select("*")
                .eq("user_id", userId);

            if (receiptsError) {
                throw new Error(receiptsError.message);
            }

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

    // Handle status filter change
    const handleStatusFilterChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    // Filter the receipts based on selected status
    const filteredReceipts = receipts.filter((receipt) => {
        if (selectedStatus === "") return true; // Show all receipts if no filter is selected
        return receipt.newStatus === selectedStatus;
    });

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

            {/* Status filter dropdown */}
            <Select
                placeholder="Filter by status"
                value={selectedStatus}
                onChange={handleStatusFilterChange}
                mb={4}
            >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Successful">Successful</option>
                <option value="Cancelled">Cancelled</option>
            </Select>

            {filteredReceipts.length > 0 ? (
                filteredReceipts.map((receipt) => (
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
