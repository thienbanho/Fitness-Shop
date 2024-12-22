import React, { useState } from "react";
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
  Center,
  useToast,
  Image,
  Flex,
  IconButton,
  Divider,
  ScaleFade,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth"; // Assuming useAuth hook exists

const UploadProduct = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth(); // Get the authenticated user
  
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
  });

  const [imageUrl, setImageUrl] = useState(null);   // To store the uploaded image URL
  const [imageFile, setImageFile] = useState(null); // To store the image file

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImageUrl(reader.result); // Display the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch user_id based on the logged-in user's email
  const fetchUserId = async (email) => {
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
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!imageFile) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Fetch the seller's user_id based on the logged-in user's email
      const userId = await fetchUserId(user.email);
      if (!userId) return;

      // Generate a unique file name for the image
      const fileName = `${Date.now()}_${imageFile.name}`;
      console.log("Uploading file with name:", fileName);

      // Upload the image to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images") // Replace with your actual bucket name
        .upload(fileName, imageFile);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get the public URL of the uploaded image
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      if (urlError) {
        throw new Error(`Error fetching public URL: ${urlError.message}`);
      }

      const publicUrl = publicUrlData.publicUrl;
      setImageUrl(publicUrl); // Save the URL to state

      toast({
        title: "Upload successful",
        description: "Your image has been uploaded.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Public URL:", publicUrl);

      // Insert product data into the Supabase "products" table, including seller_id
      const { data: insertData, error: insertError } = await supabase
        .from("products")
        .insert({
          ...productData,
          image: publicUrl,
          seller_id: userId, // Include seller_id here
        });

      if (insertError) {
        throw new Error(`Error submitting product: ${insertError.message}`);
      }

      toast({
        title: "Product uploaded successfully",
        description: "Your product has been added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
            Upload Product
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

      <ScaleFade in={true}>
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
              border="2px dashed gray"
              borderRadius="md"
              color="gray.500"
              cursor="pointer"
              _hover={{ borderColor: "blue.400" }}
              position="relative"
              overflow="hidden"
              maxW="full"
              maxH="full"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Uploaded Image"
                  width="auto"
                  height="auto"
                  maxW="100%"
                  maxH="300px"
                  objectFit="contain"
                />
              ) : (
                <Box>
                  <FiUpload size="40px" />
                  <Input
                    type="file"
                    accept="image/*"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    opacity="0"
                    cursor="pointer"
                    onChange={handleFileChange}
                  />
                </Box>
              )}
            </Center>
          </FormControl>

          <Divider mb={6} />

          {/* Product Details */}
          <VStack align="start" spacing={4} mb={6}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="name"
                placeholder="Enter product name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Describe your product"
                value={productData.description}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Price ($)</FormLabel>
              <Input
                name="price"
                type="number"
                placeholder="0.00"
                value={productData.price}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Product Type</FormLabel>
              <Select
                name="type"
                placeholder="Select product type"
                value={productData.type}
                onChange={handleInputChange}
              >
                <option value="protein">Protein</option>
                <option value="supplement">Supplement</option>
                <option value="gear">Gear</option>
              </Select>
            </FormControl>
          </VStack>

          <Divider mb={6} />

          {/* Submit Button */}
          <Button
            colorScheme="red"
            width="100%"
            size="lg"
            onClick={handleSubmit}
          >
            Upload Product
          </Button>
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default UploadProduct;
