import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Input,
    Image,
    Text,
    Heading,
    Button,
    FormControl,
    FormLabel,
    useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import supabase from "../../config/supabaseClient";

const ReceiptForm = () => {
    const { user } = useAuth(); // Get current user from Auth context
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const toast = useToast();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const productId = params.get("product_id");
    const productQuantity = params.get("quantity");

    const navigate = useNavigate(); // Hook to navigate to another page

    useEffect(() => {
        if (user && user.email) {
            console.log('User email:', user.email);

            const fetchProduct = async () => {
                if (productId) {
                    const { data, error } = await supabase
                        .from('products')
                        .select('product_id, name, price, image, description')
                        .eq('product_id', productId)
                        .single();

                    if (error) {
                        console.error('Error fetching product:', error);
                        toast({
                            title: "Error",
                            description: "Failed to load product details. Please try again.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                    } else {
                        setProduct(data);
                        setQuantity(productQuantity);
                        setTotalPrice(data.price * productQuantity);
                    }
                }
            };

            fetchProduct();
        } else {
            console.error("User is not authenticated.");
        }
    }, [user, productId, productQuantity]);

    const fetchUserId = async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('user_id')
            .eq('email', email)
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

    if (!user) {
        return (
            <div>
                <h1>Please sign in to access this page</h1>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all required fields are filled
        if (!fullName || !address || !phoneNumber) {
            toast({
                title: "Missing Information",
                description: "Please fill out all fields before submitting your order.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            // Get user ID from email (using user.email)
            const userId = await fetchUserId(user.email);
            if (!userId) {
                return; // User ID not found, stop the submission
            }

            // Insert receipt data into 'receipts' table
            const { data: receiptData, error: receiptError } = await supabase
                .from('receipts')
                .insert([{
                    user_id: userId, // Use userId fetched from users table
                    total: totalPrice,
                    status: 'pending',
                    payment_method: 'cash on delivery', // You can make this dynamic if needed
                    shipping_address: address,
                }])
                .select() // Ensure the inserted data is returned
                .single();
            
            console.log('Receipt data:', receiptData);
            if (receiptError) {
                throw new Error(receiptError.message);
            }

            console.log('Receipt data inserted:', receiptData);

            // Check if receiptData contains the correct receipt_id
            if (!receiptData || !receiptData.receipt_id) {
                throw new Error("Receipt ID is missing after insertion.");
            }

            // Insert receipt item(s) into 'receipt_items' table
            const { error: itemsError } = await supabase
                .from('receipt_items')
                .insert([{
                    receipt_id: receiptData.receipt_id, // Ensure receipt_id is correctly passed
                    product_id: product.product_id,
                    quantity: quantity,
                    price: product.price,
                    total: totalPrice,
                    status : 'pending',
                }]);

            if (itemsError) {
                throw new Error(itemsError.message);
            }

            // Show success toast
            toast({
                title: "Order Submitted",
                description: "Your order has been successfully submitted.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Redirect to the ReceiptConfirm page with the receipt_id as a query parameter
            navigate(`/ReceiptConfirm?receipt_id=${receiptData.receipt_id}`);

            // Optionally, reset form fields or perform other actions
            setFullName("");
            setAddress("");
            setPhoneNumber("");
        } catch (error) {
            console.error("Error submitting order:", error);
            toast({
                title: "Error",
                description: error.message || "An error occurred while submitting your order.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (!product) {
        return <Text>Loading product information...</Text>;
    }

    return (
        <Box maxW="lg" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="md">
            <Heading as="h2" size="lg" mb={4}>Product Receipt</Heading>
            <VStack spacing={6} align="stretch">
                <Box>
                    <Heading as="h3" size="md">{product.name}</Heading>
                    <Image src={product.image} alt={product.name} mb={4} borderRadius="md" />
                    <Text>{product.description}</Text>
                    <Text mt={2}>
                        <strong>Quantity:</strong> {quantity}
                    </Text>
                    <Text mt={2} fontSize="xl" color="green.500">
                        Total: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice)}
                    </Text>
                </Box>
                <Box as="form" onSubmit={handleSubmit}>
                    <FormControl id="fullName" isRequired>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                        />
                    </FormControl>

                    <FormControl id="address" isRequired mt={4}>
                        <FormLabel>Address</FormLabel>
                        <Input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                        />
                    </FormControl>

                    <FormControl id="phoneNumber" isRequired mt={4}>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                        />
                    </FormControl>

                    <Button
                        mt={6}
                        colorScheme="blue"
                        size="lg"
                        width="full"
                        type="submit"
                    >
                        Submit Order
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default ReceiptForm;
