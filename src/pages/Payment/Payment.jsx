import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { orderData } from "./PaymentData"; // Adjusted import
import { Box, Heading, Text, Flex, FormControl, FormLabel, Input, Select, Button, VStack, HStack, Radio, RadioGroup, Divider, Center, SimpleGrid, useToast } from "@chakra-ui/react";

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
      <Flex
        paddingTop={28}
        maxW="1200px"
        mx="auto"
        flexDirection={{ base: "column", lg: "row" }}
        gap={6}
        p={4}
      >
        {/* Shipping Info Section */}
        <Box
          flex="1"
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          border="1px solid #e0e0e0"
          _hover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <Heading size="md" mb={4} color="gray.800">
            Shipping Information
          </Heading>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel color="gray.600">Full Name</FormLabel>
              <Input
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                bg="gray.50"
                borderColor="gray.300"
                _hover={{ borderColor: "green.500" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.600">Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                value={shippingInfo.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                bg="gray.50"
                borderColor="gray.300"
                _hover={{ borderColor: "green.500" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.600">Address</FormLabel>
              <Input
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                bg="gray.50"
                borderColor="gray.300"
                _hover={{ borderColor: "green.500" }}
              />
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <FormControl>
                <FormLabel color="gray.600">City/Province</FormLabel>
                <Select
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  placeholder="Select city/province"
                  bg="gray.50"
                  borderColor="gray.300"
                  _hover={{ borderColor: "green.500" }}
                >
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Ha Noi">Ha Noi</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel color="gray.600">District</FormLabel>
                <Select
                  name="district"
                  value={shippingInfo.district}
                  onChange={handleInputChange}
                  placeholder="Select district"
                  bg="gray.50"
                  borderColor="gray.300"
                  _hover={{ borderColor: "green.500" }}
                >
                  <option value="District 1">District 1</option>
                  <option value="District 2">District 2</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel color="gray.600">Ward</FormLabel>
                <Select
                  name="ward"
                  value={shippingInfo.ward}
                  onChange={handleInputChange}
                  placeholder="Select ward"
                  bg="gray.50"
                  borderColor="gray.300"
                  _hover={{ borderColor: "green.500" }}
                >
                  <option value="Ward 1">Ward 1</option>
                  <option value="Ward 2">Ward 2</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </VStack>

          <Divider my={6} />

          {/* Shipping Method Section */}
          <Heading size="md" mb={4} color="gray.800">
            Shipping Method
          </Heading>
          <Center
            p={4}
            border="1px dashed gray"
            borderRadius="md"
            color="gray.500"
            textAlign="center"
            _hover={{ borderColor: "green.500", bg: "green.50" }}
          >
            Please select a city/province to see available shipping methods.
          </Center>

          <Divider my={6} />

          {/* Payment Method Section */}
          <Heading size="md" mb={4} color="gray.800">
            Payment Method
          </Heading>
          <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
            <VStack spacing={3} align="stretch">
              <Radio value="COD" colorScheme="green">Cash on Delivery (COD)</Radio>
            </VStack>
          </RadioGroup>
          <Text mt={2} color="gray.600">
            Thank you for trusting FitnessShop.
          </Text>

          <Button
            bgColor="green.500"
            mt={6}
            w="full"
            size="lg"
            color="white"
            fontWeight="bold"
            _hover={{ bgColor: "green.600" }}
            onClick={completeOrder}
          >
            Complete Order
          </Button>
        </Box>

        {/* Order Summary Section */}
        <Box
          flex="1"
          maxW={{ base: "100%", lg: "400px" }}
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          border="1px solid #e0e0e0"
          _hover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <Heading size="md" mb={4} color="gray.800">
            Your Order
          </Heading>
          <VStack spacing={3} align="stretch" mb={4}>
            {orderData.map((item) => (
              <Flex key={item.id} justifyContent="space-between">
                <Text fontWeight="bold" color="gray.700">
                  {item.name} (x{item.quantity})
                </Text>
                <Text color="green.500">${(item.price * item.quantity).toFixed(2)}</Text>
              </Flex>
            ))}
          </VStack>
          <FormControl mb={4}>
            <FormLabel color="gray.600">Discount Code</FormLabel>
            <HStack>
              <Input
                value={discountCode}
                onChange={handleDiscountCodeChange}
                placeholder="Enter discount code"
                bg="gray.50"
                borderColor="gray.300"
                _hover={{ borderColor: "green.500" }}
              />
              <Button bgColor="green.500" color="white" onClick={applyDiscount}>
                Apply
              </Button>
            </HStack>
          </FormControl>
          <Divider mb={4} />
          <VStack spacing={3} align="stretch">
            <Flex justifyContent="space-between">
              <Text color="gray.600">Subtotal</Text>
              <Text color="green.500">${subtotal.toFixed(2)}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.600">Shipping Fee</Text>
              <Text color="green.500">${shippingFee.toFixed(2)}</Text>
            </Flex>
            <Divider />
            <Flex
              justifyContent="space-between"
              fontWeight="bold"
              fontSize="lg"
            >
              <Text color="gray.800">Total</Text>
              <Text color="green.600">${total.toFixed(2)}</Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Payment;
