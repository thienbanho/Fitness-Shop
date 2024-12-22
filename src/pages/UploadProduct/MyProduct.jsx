import React, { useEffect, useState } from "react";
import { 
  Box, Heading, Text, VStack, Image, Flex, Spinner, useToast, IconButton, Button 
} from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth"; // Assuming you have an Auth context or hook

const MyProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { user } = useAuth(); // Assuming useAuth provides the logged-in user
  const toast = useToast();
  const navigate = useNavigate();

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

  const deleteProduct = async (productId) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("product_id", productId); // Corrected to product_id

      if (error) {
        throw new Error(error.message);
      }
      console.log("Deleted product with ID:", productId);
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product.product_id !== productId));

      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchMyProducts = async () => {
      if (!user?.email) {
        // Wait for the user to be available
        return;
      }

      try {
        // Fetch user ID based on email
        const userId = await fetchUserId(user.email);
        if (!userId) {
          throw new Error("User ID not found.");
        }

        // Fetch the user's products based on seller_id (which is user_id)
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("seller_id", userId); // Use the seller_id as user_id

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

    fetchMyProducts(); // Fetch products once the user is available
  }, [user, toast]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box bg="gray.100" minH="100vh" p={5}>
      <Flex justifyContent="center" alignItems="center" mb={8}>
        <Flex
          maxWidth="700px"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading fontSize="2xl" color="gray.700" mb={4}>
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
      </Flex>

      {products.length > 0 ? (
        <VStack spacing={8} align="start">
          {products.map((product) => (
            <Box
              key={product.product_id} // Corrected to product_id
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="lg"
              width="100%"
              maxW="700px"
              transition="all 0.3s ease"
              _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
            >
              <Flex direction={["column", "row"]} align="center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={["100%", "200px"]}
                  height={["200px", "200px"]}
                  objectFit="cover"
                  borderRadius="md"
                  mr={[0, 4]}
                  mb={[4, 0]}
                />
                <Box flex="1">
                  <Heading fontSize="xl" color="gray.700">
                    {product.name}
                  </Heading>
                  <Text mt={2} color="gray.500">
                    {product.description}
                  </Text>
                  <Text mt={2} fontWeight="bold">
                    Price: ${product.price}
                  </Text>
                </Box>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => deleteProduct(product.product_id)} // Corrected to product_id
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        <Flex justify="center" align="center" minH="300px">
          <Text fontSize="xl" color="gray.600">
            You haven't uploaded any products yet.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default MyProducts;
