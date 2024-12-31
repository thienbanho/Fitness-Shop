import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  Spinner,
  useToast,
  IconButton,
  Container,
  SimpleGrid,
  Badge,
  Button,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth";

const MyProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const fetchUserId = async (email) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", email)
        .single();

      if (error) {
        toast({
          title: "Error fetching user ID",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return null;
      }

      return data?.user_id;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
  };

  useEffect(() => {
    const fetchMyProducts = async () => {
      if (!user?.email) {
        return;
      }

      try {
        const userId = await fetchUserId(user.email);
        if (!userId) {
          throw new Error("User ID not found.");
        }

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("seller_id", userId);

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          setProducts(data);
        }
      } catch (error) {
        toast({
          title: "Error fetching products",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [user, toast]);

  const handleEdit = (productId) => {
    // Implement edit functionality
    console.log("Edit product:", productId);
  };

  const handleDelete = (productId) => {
    // Implement delete functionality
    console.log("Delete product:", productId);
  };

  if (loading) {
    return (
      <Container maxW="container.xl" centerContent>
        <VStack spacing={8} w="full" py={10}>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height="200px" width="100%" borderRadius="md" />
          ))}
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Container maxW="container.xl" py={10}>
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Heading fontSize="3xl" color={textColor}>
            My Products
          </Heading>
          <IconButton
            aria-label="Go back to Home"
            icon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            colorScheme="blue"
            variant="outline"
            size="lg"
          />
        </Flex>

        {products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {products.map((product) => (
              <Box
                key={product.id}
                bg={bgColor}
                p={6}
                borderRadius="lg"
                boxShadow="md"
                borderWidth="1px"
                borderColor={borderColor}
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width="100%"
                  height="200px"
                  objectFit="cover"
                  borderRadius="md"
                  mb={4}
                />
                <Heading fontSize="xl" color={textColor} mb={2}>
                  {product.name}
                </Heading>
                <Text color={textColor} noOfLines={2} mb={2}>
                  {product.description}
                </Text>
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Badge colorScheme="green" fontSize="md">
                    ${product.price}
                  </Badge>
                  <Text color={textColor} fontSize="sm">
                    Stock: {product.stock}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Flex
            justify="center"
            align="center"
            minH="300px"
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={8}
          >
            <VStack spacing={4}>
              <Text fontSize="xl" color={textColor}>
                You haven't uploaded any products yet.
              </Text>
              <Button
                colorScheme="blue"
                onClick={() => navigate("/uploadProduct")}
              >
                Upload Your First Product
              </Button>
            </VStack>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default MyProducts;

