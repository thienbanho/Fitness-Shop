import {
    Box,
    Image,
    Text,
    Badge,
    HStack,
    Stack,
} from "@chakra-ui/react"
import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <Box
        maxW="252px"
        h="auto"
        overflow="hidden"
        p={4}
    >
        {/* Product Image */}
        <Image width="252px" height="230px" src={product.image} />

        {/* Product Details */}
        <Stack spacing={2} mt={3}>
            {/* Brand */}
            <Text fontWeight="bold" fontSize="lg">
            {product.name}
            </Text>

            {/* Product Name */}
            <Text fontSize="md" noOfLines={2}>
            {product.description}
            </Text>

            {/* Pricing Section */}
            <HStack justifyContent="space-between">
            {/* Current Price */}
            <Text fontWeight="bold" fontSize="xl" color="red.500">
                {product.price}
            </Text>
            </HStack>

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

export default ProductCard