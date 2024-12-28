import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  VStack,
  useToast,
  HStack,
  Heading,
  IconButton,
  useColorModeValue,
  Container,
  Divider,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useAuth } from "../../hooks/Auth";
import supabase from "../../config/supabaseClient";

export default function Cart() {
  const { user } = useAuth();
  const toast = useToast();
  const [cartId, setCartId] = useState(null); // Thêm state để lưu cart_id
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const navigate = useNavigate();

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

  const fetchCart = async () => {
    try {
      const userId = await fetchUserId(user.email);
      if (!userId) return;

      // Lấy cart_id từ bảng 'cart'
      const { data: cartData, error: cartError } = await supabase
        .from("cart")
        .select("cart_id")
        .eq("user_id", userId)
        .single(); // 'single' để chỉ lấy 1 bản ghi

      // Kiểm tra lỗi trong truy vấn
      if (cartError) {
        throw new Error(cartError.message);
      }

      setCartId(cartData.cart_id); // Lưu cart_id vào state

      console.log("cartData:", cartData); // Kiểm tra cartData có chứa cart_id không

      // Lấy các item từ giỏ hàng
      const { data: cartItemsData, error: itemsError } = await supabase
        .from("cart_items")
        .select("product_id, quantity")
        .eq("cart_id", cartData.cart_id);

      if (itemsError) {
        throw new Error(itemsError.message);
      }

      const productIds = cartItemsData.map((item) => item.product_id);
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("product_id, name, price, image")
        .in("product_id", productIds);

      if (productsError) {
        throw new Error(productsError.message);
      }

      const updatedCartItems = cartItemsData.map((cartItem) => {
        const product = productsData.find(
          (product) => product.product_id === cartItem.product_id
        );
        return {
          ...cartItem,
          ...product,
        };
      });

      setCartItems(updatedCartItems);
    } catch (error) {
      toast({
        title: "Error fetching cart",
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
    if (user) {
      fetchCart();
    }
  }, [user]);

  const clearCart = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is already empty.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    

    if (!cartId) {
      toast({
        title: "Error",
        description: "Cart ID is invalid. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId);

      if (error) {
        throw new Error(error.message);
      }

      setCartItems([]);
      toast({
        title: "Success",
        description: "Cart cleared successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const checkoutCart = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty. Please add items before checkout.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Tạo query parameters từ danh sách sản phẩm
    const queryParams = cartItems
      .map((item) => `product_id=${item.product_id}&quantity=${item.quantity}`)
      .join("&");

    // Điều hướng tới ReceiptForm kèm query parameters
    navigate(`/ReceiptForm?${queryParams}`);
    clearCart();
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Your Cart</Heading>

        {cartItems.length === 0 ? (
          <Box p={6} textAlign="center">
            <Text>Your cart is empty</Text>
          </Box>
        ) : (
          <>
            {cartItems.map((item) => (
              <Box
                key={item.product_id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                borderColor={borderColor}
                bg={bgColor}
              >
                <Flex align="center" justify="space-between">
                  <HStack spacing={4}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">{item.name}</Text>
                      <Text color="gray.600">${item.price.toFixed(2)}</Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={4}>
                    <HStack>
                      <IconButton
                        icon={<MinusIcon />}
                        size="sm"
                        variant="outline"
                        isDisabled
                      />
                      <Text px={2} minW="40px" textAlign="center">
                        {item.quantity}
                      </Text>
                      <IconButton
                        icon={<AddIcon />}
                        size="sm"
                        variant="outline"
                        isDisabled
                      />
                    </HStack>
                    <Text fontWeight="bold" minW="100px" textAlign="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </HStack>
                </Flex>
              </Box>
            ))}

            <Divider />

            <Box p={4}>
              <Flex justify="space-between" align="center">
                <VStack align="start" spacing={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Total
                  </Text>
                  <Text color="gray.600">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    items
                  </Text>
                </VStack>
                <VStack align="end" spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold">
                    ${calculateTotal().toFixed(2)}
                  </Text>
                  <HStack spacing={4}>
                    <Button colorScheme="red" onClick={clearCart}>
                      Clear All
                    </Button>
                    <Button colorScheme="blue" onClick={checkoutCart}>
                      Checkout
                    </Button>
                  </HStack>
                </VStack>
              </Flex>
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
}
