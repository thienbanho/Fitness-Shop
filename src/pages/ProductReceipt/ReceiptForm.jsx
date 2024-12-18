import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Input,
    Flex,
    Image,
    Text,
    Heading,
    Button,
    FormControl,
    FormLabel,
    useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import supabase from "../../config/supabaseClient";

const ReceiptForm = () => {
    const { user } = useAuth();
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

    useEffect(() => {
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
    }, [productId, productQuantity]);

    if (!user) {
        return (
            <div>
                <h1>Please sign in to access this page</h1>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        toast({
            title: "Order Submitted",
            description: "Your order has been submitted successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
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
