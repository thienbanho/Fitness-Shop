import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    HStack,
    Input,
    Image,
    Text,
    Heading,
    Button,
    FormControl,
    FormLabel,
    useToast,
    Container,
    Divider,
    SimpleGrid,
    Badge,
    Skeleton,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import supabase from "../../config/supabaseClient";

const ReceiptForm = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const toast = useToast();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const items = [];
    for (const [key, value] of queryParams.entries()) {
        if (key === "product_id") {
            items.push({ product_id: parseInt(value), quantity: 0 });
        } else if (key === "quantity") {
            items[items.length - 1].quantity = parseInt(value);
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.email) {
            console.log('User email:', user.email);

            const fetchProducts = async () => {
                const productIds = items.map(item => item.product_id);
                
                if (productIds.length > 0) {
                    const { data, error } = await supabase
                        .from('products')
                        .select('product_id, name, price, image, description')
                        .in('product_id', productIds);

                    if (error) {
                        console.error('Error fetching products:', error);
                        toast({
                            title: "Error",
                            description: "Failed to load product details. Please try again.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                    } else {
                        setProducts(data);
                        setQuantity(items.map(item => item.quantity));
                        const total = data.reduce((acc, product, index) => {
                            return acc + product.price * items[index].quantity;
                        }, 0);
                        setTotalPrice(total);
                    }
                }
            };

            fetchProducts();
        } else {
            console.error("User is not authenticated.");
        }
    }, [user, items]);

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
            <Container maxW="lg" centerContent>
                <Box textAlign="center" py={10} px={6}>
                    <Heading as="h2" size="xl">
                        Please sign in to access this page
                    </Heading>
                    <Text mt={4}>You need to be logged in to view and submit orders.</Text>
                </Box>
            </Container>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            const userId = await fetchUserId(user.email);
            if (!userId) {
                return;
            }

            const { data: receiptData, error: receiptError } = await supabase
                .from('receipts')
                .insert([{
                    user_id: userId,
                    total: totalPrice,
                    status: 'pending',
                    payment_method: 'cash on delivery',
                    shipping_address: address,
                }])
                .select()
                .single();
            
            console.log('Receipt data:', receiptData);
            if (receiptError) {
                throw new Error(receiptError.message);
            }

            console.log('Receipt data inserted:', receiptData);

            if (!receiptData || !receiptData.receipt_id) {
                throw new Error("Receipt ID is missing after insertion.");
            }

            const itemsToInsert = products.map((product, index) => ({
                receipt_id: receiptData.receipt_id,
                product_id: product.product_id,
                quantity: quantity[index],
                price: product.price,
                total: product.price * quantity[index],
                status : 'pending',
            }));

            const { error: itemsError } = await supabase
                .from('receipt_items')
                .insert(itemsToInsert);

            if (itemsError) {
                throw new Error(itemsError.message);
            }

            toast({
                title: "Order Submitted",
                description: "Your order has been successfully submitted.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            navigate(`/ReceiptConfirm?receipt_id=${receiptData.receipt_id}`);

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

    if (products.length === 0) {
        return (
            <Container maxW="lg" centerContent>
                <VStack spacing={4} align="stretch" w="full">
                    <Skeleton height="60px" />
                    <Skeleton height="200px" />
                    <Skeleton height="40px" />
                    <Skeleton height="40px" />
                    <Skeleton height="40px" />
                </VStack>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={10}>
            <VStack spacing={8} align="stretch">
                <Heading as="h1" size="2xl" textAlign="center">
                    Order Summary
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <VStack spacing={6} align="stretch">
                        <Heading as="h2" size="lg">
                            Products
                        </Heading>
                        {products.map((product, index) => (
                            <Box key={product.product_id} borderWidth={1} borderRadius="lg" p={4} shadow="md">
                                <HStack spacing={4} align="start">
                                    <Image 
                                        src={product.image} 
                                        alt={product.name} 
                                        boxSize="100px" 
                                        objectFit="cover" 
                                        borderRadius="md"
                                    />
                                    <VStack align="start" flex={1}>
                                        <Heading as="h3" size="md">{product.name}</Heading>
                                        <Text fontSize="sm" color="gray.600">{product.description}</Text>
                                        <HStack justify="space-between" w="full">
                                            <Badge colorScheme="purple">Qty: {quantity[index]}</Badge>
                                            <Text fontWeight="bold" color="green.500">
                                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price * quantity[index])}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </Box>
                        ))}
                        <Divider />
                        <HStack justify="space-between">
                            <Text fontSize="xl" fontWeight="bold">Total</Text>
                            <Text fontSize="xl" fontWeight="bold" color="green.500">
                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice)}
                            </Text>
                        </HStack>
                    </VStack>
                    <VStack spacing={6} align="stretch">
                        <Heading as="h2" size="lg">
                            Shipping Information
                        </Heading>
                        <Box as="form" onSubmit={handleSubmit} borderWidth={1} borderRadius="lg" p={6} shadow="md">
                            <VStack spacing={4}>
                                <FormControl id="fullName" isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your full name"
                                    />
                                </FormControl>
                                <FormControl id="address" isRequired>
                                    <FormLabel>Address</FormLabel>
                                    <Input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your address"
                                    />
                                </FormControl>
                                <FormControl id="phoneNumber" isRequired>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter your phone number"
                                    />
                                </FormControl>
                                <Button
                                    mt={4}
                                    colorScheme="blue"
                                    size="lg"
                                    width="full"
                                    type="submit"
                                >
                                    Submit Order
                                </Button>
                            </VStack>
                        </Box>
                    </VStack>
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default ReceiptForm;

