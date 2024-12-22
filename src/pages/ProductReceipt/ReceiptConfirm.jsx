import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Text,
    Heading,
    Button,
    useToast,
    Spinner,
    Image,
    Divider,
    SimpleGrid,
    Flex,
    Center,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import supabase from "../../config/supabaseClient";

const ReceiptConfirm = () => {
    const [receipt, setReceipt] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const receiptId = params.get("receipt_id");

    const calculateReceiptStatus = (receiptItems) => {
        const allDelivered = receiptItems.every((item) => item.status === "Delivered");
        const allSuccessful = receiptItems.every((item) => item.status === "Successful");

        if (allDelivered) return "Delivered";
        if (allSuccessful) return "Successful";
        return "Pending"; // Default status
    };

    useEffect(() => {
        if (receiptId) {
            const fetchReceipt = async () => {
                try {
                    // Fetch receipt data from the 'receipts' table
                    const { data: receiptData, error: receiptError } = await supabase
                        .from("receipts")
                        .select("*")
                        .eq("receipt_id", receiptId)
                        .single();

                    if (receiptError) {
                        throw new Error(receiptError.message);
                    }

                    // Fetch receipt items and associated products
                    const { data: receiptItems, error: itemsError } = await supabase
                        .from("receipt_items")
                        .select("product_id, quantity, total, status") // Fetch status for each item
                        .eq("receipt_id", receiptId);

                    if (itemsError) {
                        throw new Error(itemsError.message);
                    }

                    // Calculate receipt status based on items
                    const newStatus = calculateReceiptStatus(receiptItems);

                    // Get product details for each product_id in receipt_items
                    const productPromises = receiptItems.map(async (item) => {
                        const { data: productData, error: productError } = await supabase
                            .from("products")
                            .select("name, image, price")
                            .eq("product_id", item.product_id)
                            .single();

                        if (productError) {
                            throw new Error(productError.message);
                        }

                        return {
                            ...item,
                            product: productData,
                        };
                    });

                    const products = await Promise.all(productPromises);

                    // Set state with fetched data and new status
                    setReceipt({ ...receiptData, status: newStatus });
                    setProducts(products);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    toast({
                        title: "Error",
                        description: error.message || "Failed to fetch receipt data.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            };

            fetchReceipt();
        }
    }, [receiptId, toast]);

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner size="xl" color="teal.500" />
            </Center>
        );
    }

    if (!receipt || products.length === 0) {
        return <Text>No receipt found.</Text>;
    }

    return (
        <Box
            maxW="4xl"
            mx="auto"
            mt={10}
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
        >
            <Heading as="h2" size="xl" textAlign="center" mb={8} color="gray.700">
                Receipt Confirmation
            </Heading>
            <VStack spacing={6} align="stretch">
                <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                    <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        Receipt Details
                    </Text>
                    <Text color="gray.500">
                        <strong>Receipt ID:</strong> {receipt.receipt_id}
                    </Text>
                    <Text color="gray.500">
                        <strong>Payment Method:</strong> {receipt.payment_method}
                    </Text>
                    <Text color="gray.500">
                        <strong>Status:</strong> {receipt.status}
                    </Text>
                    <Text color="gray.500">
                        <strong>Shipping Address:</strong> {receipt.shipping_address}
                    </Text>
                    <Divider my={4} />
                    <Text fontSize="xl" fontWeight="bold" color="teal.500">
                        Total:{" "}
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(receipt.total)}
                    </Text>
                </Box>

                <Box>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        Products in this Receipt
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                        {products.map((item, index) => (
                            <Box
                                key={index}
                                p={4}
                                borderWidth={1}
                                borderRadius="md"
                                boxShadow="sm"
                                bg="white"
                            >
                                <Flex direction="column" align="center">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        borderRadius="md"
                                        boxSize="200px"
                                        objectFit="cover"
                                        mb={4}
                                    />
                                    <Text fontWeight="semibold" fontSize="lg" color="gray.700">
                                        {item.product.name}
                                    </Text>
                                    <Text color="gray.600">
                                        <strong>Quantity:</strong> {item.quantity}
                                    </Text>
                                    <Text color="gray.600">
                                        <strong>Price per Item:</strong>{" "}
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(item.product.price)}
                                    </Text>
                                    <Text fontWeight="bold" fontSize="lg" color="teal.500" mt={2}>
                                        <strong>Total:</strong>{" "}
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(item.total)}
                                    </Text>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>

                <Button
                    colorScheme="teal"
                    size="lg"
                    width="full"
                    onClick={() => window.location.href = "/"} // Redirect to home page or another route after confirmation
                >
                    Back to Home
                </Button>
            </VStack>
        </Box>
    );
};

export default ReceiptConfirm;
