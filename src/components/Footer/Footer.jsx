import React from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Input,
  Button,
  Link,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box bg="black" color="white" py={6} px={4} mt="auto" position="relative" bottom="0" width="100%">
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start" maxWidth="1200px" mx="auto">
        {/* Store Information Section */}
        <VStack align="flex-start" spacing={4} mb={{ base: 8, md: 0 }}>
          <Text fontWeight="bold" fontSize="xl">THE FITNESS SHOP!®</Text>
          <HStack>
            <Icon as={FaMapMarkerAlt} boxSize={4} />
            <Text>227 NVC, Quận 5, HCM</Text>
          </HStack>
          <HStack>
            <Icon as={FaPhoneAlt} boxSize={4} />
            <Text>0582079324</Text>
          </HStack>
          <HStack>
            <Icon as={FaEnvelope} boxSize={4} />
            <Text>abc@gmail.com</Text>
          </HStack>
        </VStack>

        {/* About Us Section */}
        <VStack align="flex-start" spacing={2} mb={{ base: 8, md: 0 }}>
          <Text fontWeight="bold" fontSize="lg">About us</Text>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Search</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Introduction</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Payment Change Policy</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Main delivery</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Policy payment</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Buying guide</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Service account</Link>
        </VStack>

        {/* Sign-up Section */}
        <VStack align="flex-start" spacing={4}>
          <Text fontWeight="bold" fontSize="lg">Sign up to receive promotions</Text>
          <HStack as="form">
            <Input placeholder="Nhập email của bạn" size="sm" bg="white" color="black" _placeholder={{ color: 'gray.500' }} />
            <Button size="sm" colorScheme="blue">Gửi</Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
}
