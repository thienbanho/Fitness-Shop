import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Image,
    Text,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import supabase from "../../config/supabaseClient";

const CartForm = () => {
    const { user } = useAuth(); // Get current user from Auth context
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const toast = useToast();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const productId = params.get("product_id");
    const productQuantity = params.get("quantity");

    const navigate = useNavigate(); // Hook to navigate to another page

    useEffect(() => {
        if (user && user.email) {
            console.log("User email:", user.email);

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

    const fetchCartId = async (userId) => {
        const { data, error } = await supabase
            .from('cart')
            .select('cart_id')
            .eq('user_id', userId)
            .single();

        if (error) {
            toast({
                title: "Error",
                description: "Failed to fetch cart. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return null;
        }
        return data?.cart_id;
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

        try {
            // Get user ID from email (using user.email)
            const userId = await fetchUserId(user.email);
            if (!userId) {
                return; // User ID not found, stop the submission
            }

            // Check if user already has a cart
            let cartId = await fetchCartId(userId);

            // If no cart exists, create a new cart
            if (!cartId) {
                const { data: cartData, error: cartError } = await supabase
                    .from('cart')
                    .insert([{
                        user_id: userId, // Use userId fetched from users table
                        total: totalPrice,
                    }])
                    .select() // Ensure the inserted data is returned
                    .single();
                
                if (cartError) {
                    throw new Error(cartError.message);
                }

                cartId = cartData.cart_id;
            }

            // Insert cart item(s) into 'cart_items' table
            const { error: itemsError } = await supabase
                .from('cart_items')
                .insert([{
                    cart_id: cartId, // Ensure cart_id is correctly passed
                    product_id: product.product_id,
                    quantity: quantity,
                    price: product.price,
                    total: totalPrice,
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

            // Redirect to the cart page
            navigate(`/Cart`);

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
            <Heading as="h2" size="lg" mb={4}>Product cart</Heading>
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
                    <Button
                        mt={6}
                        colorScheme="blue"
                        size="lg"
                        width="full"
                        type="submit"
                    >
                        Add to Cart
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default CartForm;
