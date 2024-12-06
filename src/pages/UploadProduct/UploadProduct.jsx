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
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

const UploadProduct = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    type: "",
  });

  const [imageFile, setImageFile] = useState(null); // Lưu file ảnh
  const [imageUrl, setImageUrl] = useState(null); // Lưu URL ảnh sau khi tải lên

  // Xử lý khi người dùng chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImageUrl(reader.result); // Hiển thị ảnh
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý upload ảnh lên Supabase
  const handleImageUpload = async () => {
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

    const fileName = `${Date.now()}_${imageFile.name}`; // Tên file duy nhất

    const { data, error } = await supabase.storage
      .from("product-images") // Thay bằng tên bucket của bạn
      .upload(fileName, imageFile);

    if (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const { publicUrl } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      setImageUrl(publicUrl); // Lưu URL để hiển thị ảnh
      toast({
        title: "Upload successful",
        description: "Your image has been uploaded.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Xử lý thay đổi dữ liệu form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit toàn bộ form
  const handleSubmit = async () => {
    if (!imageUrl) {
      toast({
        title: "Missing image",
        description: "Please upload a product image.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .insert({ ...productData, image: imageUrl });

    if (error) {
      toast({
        title: "Error submitting product",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product uploaded successfully",
        description: "Your product has been added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/"); // Quay lại trang chủ
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
          <Heading fontSize="2xl" color="gray.700">
            Upload Product
          </Heading>
          <IconButton
            aria-label="Go back to Home"
            icon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
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
                objectFit="contain" // Giữ nguyên tỷ lệ ảnh
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

          <Button
            mt={4}
            colorScheme="blue"
            onClick={handleImageUpload}
            isDisabled={!imageFile}
          >
            Upload Image
          </Button>
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
            <FormLabel>Stock Quantity</FormLabel>
            <Input
              name="stock"
              type="number"
              placeholder="0"
              value={productData.quantity}
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
          variant="solid"
          onClick={handleSubmit}
        >
          Upload Product
        </Button>
      </Box>
    </Box>
  );
};

export default UploadProduct;
