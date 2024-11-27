import React from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Heading,
  Text,
  Flex,
  IconButton,
  Divider,
  Center,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import router for navigation
import { ArrowBackIcon } from "@chakra-ui/icons"; // Import the icon

const UploadProduct = () => {
  const navigate = useNavigate(); // Use navigate for routing

  return (
    <Box bg="gray.100" minH="100vh" p={5}>
      <Flex justifyContent="center" alignItems="center" mb={8}>
    <Flex
      maxWidth="700px"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Header */}
      <Heading fontSize="2xl" color="gray.700">
        Upload Product
      </Heading>
      <IconButton
        aria-label="Go back to Home"
        icon={<ArrowBackIcon />} // Icon for the button
        onClick={() => navigate("/")} // Navigate to Home
        colorScheme="blue"
        variant="outline"
      />
    </Flex>
  </Flex>

  <Box
    maxW="700px"
    mx="auto"
    bg="white"
    p={8}
    borderRadius="md"
    boxShadow="lg"
  >
        {/* Product Images */}
        <FormControl mb={6}>
          <FormLabel fontSize="lg" fontWeight="bold" color="gray.600">
            Product Images
          </FormLabel>
          <Center
            h="150px"
            border="2px dashed gray"
            borderRadius="md"
            color="gray.500"
            cursor="pointer"
            _hover={{ borderColor: "blue.400" }}
          >
            <FiUpload size="40px" />
          </Center>
        </FormControl>

        <Divider mb={6} />

        {/* Product Details */}
        <VStack align="start" spacing={4} mb={6}>
          <Heading size="md" color="gray.600">
            Product Details
          </Heading>

          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input placeholder="Enter product name" />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Describe your product" />
          </FormControl>

          <FormControl>
            <FormLabel>Price ($)</FormLabel>
            <Input type="number" placeholder="0.00" />
          </FormControl>

          <FormControl>
            <FormLabel>Stock Quantity</FormLabel>
            <Input type="number" placeholder="0" />
          </FormControl>

          <FormControl>
            <FormLabel>Product Type</FormLabel>
            <Select placeholder="Select product type">
              <option value="protein">Protein</option>
              <option value="supplement">Supplement</option>
              <option value="gear">Gear</option>
            </Select>
          </FormControl>
        </VStack>

        <Divider mb={6} />

        {/* Additional Information */}
        <VStack align="start" spacing={4} mb={6}>
          <Heading size="md" color="gray.600">
            Additional Information
          </Heading>

          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Input placeholder="Enter brand name" />
          </FormControl>

          <FormControl>
            <FormLabel>Flavor (if applicable)</FormLabel>
            <Input placeholder="e.g., Chocolate, Fruit Punch" />
          </FormControl>

          <FormControl>
            <FormLabel>Weight/Size</FormLabel>
            <Input placeholder="e.g., 2 lb, 30 servings" />
          </FormControl>

          <FormControl>
            <FormLabel>Ingredients</FormLabel>
            <Textarea placeholder="List main ingredients" />
          </FormControl>

          <FormControl>
            <FormLabel>Directions for Use</FormLabel>
            <Textarea placeholder="How to use the product" />
          </FormControl>
        </VStack>

        <Divider mb={6} />

        {/* Upload Button */}
        <Button
          leftIcon={<FiUpload />}
          colorScheme="red"
          width="100%"
          size="lg"
          variant="solid"
        >
          Upload Product
        </Button>
      </Box>
    </Box>
  );
};

export default UploadProduct;
