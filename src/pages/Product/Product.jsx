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

import { useEffect } from "react";

const Product = () => {
    const [product, setProduct] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')

            if (error) {
                console.log(error);
                toast({
                    title: "Error fetching product",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                setProduct(data);
            }
        };

        fetchProduct();
    }, [toast]);

    useEffect(() => {
        if (product) {
            console.log(product);
        }
    }, [product]);

    return (
        <Box>
            <IconButton
                icon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                aria-label="Back"
            />
            <Heading>Product Details</Heading>
            {/* Add UI components to display product details if needed */}
        </Box>
    );
};

export default Product;