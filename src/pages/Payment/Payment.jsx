import React from 'react';
import Navbar from "../../components/NavBar/NavBar"; // Navbar Component
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
} from '@chakra-ui/react';

const Payment = () => {
  return (
    <Box bg="gray.100" minH="100vh" p={5}>
        <Box as="header" width="100%" position="fixed" top="0" left="0"  zIndex="10">
        <Navbar />
      </Box>
      {/* Main Container */}
      <Flex paddingTop={20} maxW="1200px" mx="auto" flexDirection={{ base: 'column', lg: 'row' }} gap={6}>
        {/* Left Section: Shipping and Payment */}
        <Box flex="1" bg="white" p={6} borderRadius="md" boxShadow="lg">
          {/* Shipping Information */}
          <Heading size="md" mb={4}>
            Shipping Information
          </Heading>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input placeholder="Enter your full name" />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input placeholder="Enter your phone number" />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input placeholder="Enter your address" />
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <FormControl>
                <FormLabel>City/Province</FormLabel>
                <Select placeholder="Select city/province">
                  <option>Ho Chi Minh</option>
                  <option>Ha Noi</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>District</FormLabel>
                <Select placeholder="Select district">
                  <option>District 1</option>
                  <option>District 2</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Ward</FormLabel>
                <Select placeholder="Select ward">
                  <option>Ward 1</option>
                  <option>Ward 2</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </VStack>

          <Divider my={6} />

          {/* Shipping Method */}
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

          {/* Payment Method */}
          <Heading size="md" mb={4}>
            Payment Method
          </Heading>
          <RadioGroup defaultValue="COD">
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
          >
            Complete Order
          </Button>
        </Box>

        {/* Right Section: Order Summary */}
        <Box flex="1" maxW="400px" bg="white" p={6} borderRadius="md" boxShadow="lg">
          {/* Order Details */}
          <Heading size="md" mb={4}>
            Your Order
          </Heading>
          <Flex justifyContent="space-between" mb={4}>
            <Text fontWeight="bold">Whey Apple Flavor</Text>
            <Text>$99.00</Text>
          </Flex>
          <FormControl mb={4}>
            <FormLabel>Discount Code</FormLabel>
            <HStack>
              <Input placeholder="Enter discount code" />
              <Button bgColor="black" color="white" >Apply</Button>
            </HStack>
          </FormControl>
          <Divider mb={4} />
          <VStack spacing={3} align="stretch">
            <Flex justifyContent="space-between">
              <Text>Subtotal</Text>
              <Text>$99.00</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Shipping Fee</Text>
              <Text>$0.00</Text>
            </Flex>
            <Divider />
            <Flex justifyContent="space-between" fontWeight="bold" fontSize="lg">
              <Text>Total</Text>
              <Text color="blue.500">$99.00</Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Payment;
