import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { orderData } from "./PaymentData"; // Adjusted import
import {
  Box,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Divider,
  Center,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

const Payment = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = () => {
    toast({
      title: "Discount applied",
      description: "Your discount code has been applied to the order.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const completeOrder = () => {
    console.log("Order completed", { shippingInfo, paymentMethod, orderData });
    toast({
      title: "Order placed",
      description: "Your order has been successfully placed.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const subtotal = orderData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = 0; // You can calculate this based on the selected shipping method
  const total = subtotal + shippingFee;

  return (
    <Box bg="gray.100" minH="100vh">
      <Box
        as="header"
        width="100%"
        position="fixed"
        top="0"
        left="0"
        zIndex="10"
      >
        <Navbar />
      </Box>
      <Flex
        paddingTop={28}
        maxW="1200px"
        mx="auto"
        flexDirection={{ base: "column", lg: "row" }}
        gap={6}
      >
        <Box flex="1" bg="white" p={6} borderRadius="md" boxShadow="lg">
          <Heading size="md" mb={4}>
            Shipping Information
          </Heading>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                value={shippingInfo.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <FormControl>
                <FormLabel>City/Province</FormLabel>
                <Select
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  placeholder="Select city/province"
                >
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Ha Noi">Ha Noi</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>District</FormLabel>
                <Select
                  name="district"
                  value={shippingInfo.district}
                  onChange={handleInputChange}
                  placeholder="Select district"
                >
                  <option value="District 1">District 1</option>
                  <option value="District 2">District 2</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Ward</FormLabel>
                <Select
                  name="ward"
                  value={shippingInfo.ward}
                  onChange={handleInputChange}
                  placeholder="Select ward"
                >
                  <option value="Ward 1">Ward 1</option>
                  <option value="Ward 2">Ward 2</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </VStack>

          <Divider my={6} />

          <Heading size="md" mb={4}>
            Shipping Method
          </Heading>
          <Center
            p={4}
            border="1px dashed gray"
            borderRadius="md"
            color="gray.500"
            textAlign="center"
          >
            Please select a city/province to see available shipping methods.
          </Center>

          <Divider my={6} />

          <Heading size="md" mb={4}>
            Payment Method
          </Heading>
          <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
            <VStack spacing={3} align="stretch">
              <Radio value="COD">Cash on Delivery (COD)</Radio>
            </VStack>
          </RadioGroup>
          <Text mt={2} color="gray.600">
            Thank you for trusting FitnessShop.
          </Text>

          <Button
            bgColor="black"
            mt={6}
            w="full"
            size="lg"
            color="white"
            fontWeight="bold"
            onClick={completeOrder}
          >
            Complete Order
          </Button>
        </Box>

        <Box
          flex="1"
          maxW={{ base: "100%", lg: "400px" }}
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading size="md" mb={4}>
            Your Order
          </Heading>
          <VStack spacing={3} align="stretch" mb={4}>
            {orderData.map((item) => (
              <Flex key={item.id} justifyContent="space-between">
                <Text fontWeight="bold">
                  {item.name} (x{item.quantity})
                </Text>
                <Text>${(item.price * item.quantity).toFixed(2)}</Text>
              </Flex>
            ))}
          </VStack>
          <FormControl mb={4}>
            <FormLabel>Discount Code</FormLabel>
            <HStack>
              <Input
                value={discountCode}
                onChange={handleDiscountCodeChange}
                placeholder="Enter discount code"
              />
              <Button bgColor="black" color="white" onClick={applyDiscount}>
                Apply
              </Button>
            </HStack>
          </FormControl>
          <Divider mb={4} />
          <VStack spacing={3} align="stretch">
            <Flex justifyContent="space-between">
              <Text>Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Shipping Fee</Text>
              <Text>${shippingFee.toFixed(2)}</Text>
            </Flex>
            <Divider />
            <Flex
              justifyContent="space-between"
              fontWeight="bold"
              fontSize="lg"
            >
              <Text>Total</Text>
              <Text color="blue.500">${total.toFixed(2)}</Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Payment;
