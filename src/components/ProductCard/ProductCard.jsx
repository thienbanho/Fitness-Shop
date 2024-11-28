import {
    Box,
    Image,
    Text,
    Badge,
    HStack,
    Stack,
} from "@chakra-ui/react"
import React from 'react'

import Whey from "../../assets/Products/whey.png"

export default function ProductCard() {
  return (
    <Box
        maxW="252px"
        h="auto"
        overflow="hidden"
        p={4}
        border="solid"
    >
        {/* Product Image */}
        <Image
            src={Whey} 
        />

        {/* Product Details */}
        <Stack spacing={2} mt={3}>
            {/* Brand */}
            <Text fontWeight="bold" fontSize="lg">
            NUTRABOLICS
            </Text>

            {/* Product Name */}
            <Text fontSize="md" noOfLines={2}>
            Nutrabolics Hydropure 100% Hydrolyzed Whey Protein
            </Text>

            {/* Pricing Section */}
            <HStack justifyContent="space-between">
            {/* Current Price */}
            <Text fontWeight="bold" fontSize="xl" color="red.500">
                1.750.000₫
            </Text>

            {/* Original Price and Discount */}
            <HStack spacing={2}>
                <Text as="s" fontSize="sm" color="gray.500">
                2.050.000₫
                </Text>
                <Badge colorScheme="red">-15%</Badge>
            </HStack>
            </HStack>

            {/* Additional Value */}
            <Text fontSize="sm" color="gray.500">
            Quà trị giá 250.000₫
            </Text>

            {/* Rating */}
            <HStack spacing={1}>
            <Text fontWeight="medium" fontSize="sm">
                ★★★★★
            </Text>
            <Text fontSize="sm" color="gray.500">
                (2 reviews)
            </Text>
            </HStack>
        </Stack>
    </Box>
  )
}
