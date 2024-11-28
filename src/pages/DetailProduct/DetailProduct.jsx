import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Button,
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../../components/NavBar/NavBar"; // Navbar Component
import Footer from "../../components/Footer/Footer";
import Reviews from "../../components/Review/Review";
const productData = {
  id: 1,
  name: "Whey Protein aowmfoaa awfwagwag",
  price: "1.250.000 vnd",
  description: "This is a sample description for the product.",
  images: [
    "https://www.wheystore.vn/images/products/2023/11/22/large/rule1-protein-5lbs_1700622059.jpg.webp", // Replace with your paths
    "https://www.wheystore.vn/images/products/2024/01/25/large/rule-1-5lbs-2_1706177653.jpg.webp",
    "https://www.wheystore.vn/images/products/2023/11/21/large/inforgraphic-rule1-protein-5lbs_1700622044.jpg.webp",
    "https://www.wheystore.vn/images/products/2023/11/22/large/rule1-protein-5lbs_1700622059.jpg.webp", // Replace with your paths
    "https://www.wheystore.vn/images/products/2023/11/22/large/rule1-protein-5lbs_1700622059.jpg.webp", // Replace with your paths
    "https://www.wheystore.vn/images/products/2023/11/22/large/rule1-protein-5lbs_1700622059.jpg.webp", // Replace with your paths
    "https://www.wheystore.vn/images/products/2023/11/22/large/rule1-protein-5lbs_1700622059.jpg.webp", // Replace with your paths

  ],
  types: [
    "Chocolate Peanut Butter",
    "Chocolate Banana",
    "Chocolate",
    "Salted Caramel",
    "Vanilla Milkshake",
    "Chocolate Peanut Butter",
    "Chocolate Banana",
    "Chocolate",
    "Salted Caramel",
    "Vanilla Milkshake",
    "Chocolate Peanut Butter",
    "Chocolate Banana",
    "Chocolate",
    "Salted Caramel",
    "Vanilla Milkshake","Chocolate Peanut Butter",
    "Chocolate Banana",
    "Chocolate",
    "Salted Caramel",
    "Vanilla Milkshake",
  ],
};

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Navbar */}
      <Box as="header" width="100%" position="fixed" top="0" zIndex="10">
        <Navbar />
      </Box>
      <Box maxWidth="1200px" mx="auto" px="6" py="20" flex="1">
        {/* Product Header */}
        <Flex direction={{ base: "column", lg: "row" }} gap={6}>
          {/* Image Section */}
          <Box flex="1">
            <Image
              src={selectedImage}
              alt={productData.name}
              width="100%"
              height="auto"
              borderRadius="md"
              mb="4"
            />
            {/* Thumbnail Slider */}
            <HStack spacing="4" overflowX="auto">
              {productData.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  boxSize="60px"
                  border="2px solid"
                  borderColor={
                    selectedImage === image ? "blue.400" : "gray.200"
                  }
                  cursor="pointer"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </HStack>
          </Box>

          {/* Product Info */}
          <Box flex="2">
            <Heading as="h1" size="lg" mb="4">
              {productData.name}
            </Heading>
            <Text fontSize="2xl" color="red.500" fontWeight="bold">
              {productData.price}
            </Text>
            <Text mt="4" mb="6" color="gray.600">
              {productData.description}
            </Text>

            {/* Product Types */}
            <VStack align="start" spacing="4">
              <Heading size="sm">Type</Heading>
              <HStack spacing="2" wrap="wrap">
                {productData.types.map((type, index) => (
                  <Button key={index} variant="outline" size="sm">
                    {type}
                  </Button>
                ))}
              </HStack>
            </VStack>

            {/* Quantity and Buttons */}
            <HStack mt="8" spacing="4">
              <Input type="number" width="80px" defaultValue={1} />
              <Button colorScheme="blue">Add to Cart</Button>
              <Button colorScheme="red">Buy Now</Button>
            </HStack>
          </Box>
        </Flex>
        {/* Reviews Section */}
          <Reviews />
      </Box>
      {/* Footer */}
      <Box as="footer" width="100%" bg="black" color="white" py="4">
        <Footer />
      </Box>
    </Flex>
  );
}
