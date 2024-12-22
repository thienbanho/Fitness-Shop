import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Heading,
  VStack,
  HStack,
  Button,
  Grid,
  Container,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import supabase from "../../config/supabaseClient";
import Reviews from "../../components/Review/Review";

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const productId = Number(searchParams.get('product_id'));
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('product_id', productId)
          .single();

        if (error) {
          console.error('Error fetching product:', error);
          setError('Failed to load product details. Please try again.');
        } else {
          setProductData(data);
          // Split 'type' column into an array
          const typesArray = data.type?.split(', ').map((item) => item.trim()) || [];
          setSelectedType(typesArray[0] || '');
          setProductData({ ...data, typesArray });
        }
      } else {
        setError('Invalid product ID.');
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!productData) {
    return <Text>Loading...</Text>;
  }

  const isOutOfStock = productData.stock === 0;

  // Mock data for multiple images
  const productImages = [
    productData.image,
    productData.image, // You can add more images here
    productData.image,
    productData.image,
  ];

  const handleBuyNow = () => {
    // Navigate to the ReceiptForm with the product_id and quantity as query parameters
    navigate(`/ReceiptForm?product_id=${productId}&quantity=${quantity}`);
  };

  return (
    <Container maxW="1200px" py={8}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        {/* Left Side - Product Images */}
        <Box flex={{ base: '1', md: '0.4' }}>
          <Box position="relative" mb={4}>
            <Image
              src={productImages[selectedImage]}
              alt={productData.name}
              w="100%"
              borderRadius="md"
            />
          </Box>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {productImages.map((img, index) => (
              <Box
                key={index}
                border="2px solid"
                borderColor={selectedImage === index ? "blue.500" : "gray.200"}
                borderRadius="md"
                cursor="pointer"
                onClick={() => setSelectedImage(index)}
              >
                <Image src={img} alt={`Product view ${index + 1}`} />
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Right Side - Product Info */}
        <Box flex={{ base: '1', md: '0.6' }}>
          <VStack align="stretch" spacing={4}>
            <Heading as="h1" size="xl">
              {productData.name}
            </Heading>

            <Text fontSize="3xl" color="red.500" fontWeight="bold">
              {new Intl.NumberFormat('vi-VN', { 
                style: 'currency', 
                currency: 'VND' 
              }).format(productData.price)}
            </Text>

            <Text>{productData.description}</Text>

            {/* Product Types */}
            <Box>
              <Text fontWeight="bold" mb={2}>Type</Text>
              <RadioGroup value={selectedType} onChange={setSelectedType}>
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={2}>
                  {productData.typesArray.map((type, index) => (
                    <Radio key={index} value={type}>
                      {type}
                    </Radio>
                  ))}
                </Grid>
              </RadioGroup>
            </Box>

            {/* Remove Quantity and Stock Availability */}
            {/* Removed the availability message below */}
            <Text color={isOutOfStock ? "red.500" : "transparent"}>
              {isOutOfStock ? "Out of Stock" : ""}
            </Text>

            {/* Buttons */}
            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                size="lg"
                flex="1"
                isDisabled={isOutOfStock}
              >
                Add to Cart
              </Button>
              <Button
                colorScheme="red"
                size="lg"
                flex="1"
                isDisabled={isOutOfStock}
                onClick={handleBuyNow} // Handle Buy Now click
              >
                Buy Now
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>
      {/* Reviews Section */}
      <Reviews />
    </Container>
  );
}
