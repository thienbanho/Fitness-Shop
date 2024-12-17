import {
    Box,
    Image,
    Text,
    Badge,
    HStack,
    Stack,
} from "@chakra-ui/react"
import React from 'react'

const PTCard = ({ trainer }) => {
  return (
    <Box
        maxW="252px"
        h="450px"
        overflow="hidden"
        p={4}
        border="solid"
    >
        {/* Product Image */}
        <Image width="252px" height="230px" src="https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png" />

        {/* Product Details */}
        <Stack spacing={2} mt={3}>
            <Text fontWeight="bold" fontSize="lg">
                {trainer.users.full_name}
            </Text>

            <Text fontSize="md" noOfLines={2}>
                {trainer.specialization}
            </Text>

            <HStack justifyContent="space-between">
                <Text fontWeight="bold" fontSize="xl" color="red.500">
                    ${trainer.price_start} - ${trainer.price_end}
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

export default PTCard