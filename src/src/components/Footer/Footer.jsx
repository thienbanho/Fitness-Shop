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
    <Box bg="black" color="white" py={{ base: 8, md: 6 }} px={4} mt="auto" position="relative" bottom="0" width="100%">
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ base: 'center', md: 'flex-start' }} 
        maxWidth="1200px" 
        mx="auto"
        textAlign={{ base: 'center', md: 'left' }}
      >
        {/* Store Information Section */}
        <VStack 
          align={{ base: 'center', md: 'flex-start' }} 
          spacing={4} 
          mb={{ base: 8, md: 0 }}
          width={{ base: '100%', md: 'auto' }}
        >
          <Text fontWeight="bold" fontSize={{ base: 'lg', md: 'xl' }}>THE FITNESS SHOP!®</Text>
          <HStack justify={{ base: 'center', md: 'flex-start' }} width="100%">
            <Icon as={FaMapMarkerAlt} boxSize={4} />
            <Text>227 NVC, Quận 5, HCM</Text>
          </HStack>
          <HStack justify={{ base: 'center', md: 'flex-start' }} width="100%">
            <Icon as={FaPhoneAlt} boxSize={4} />
            <Text>0582079324</Text>
          </HStack>
          <HStack justify={{ base: 'center', md: 'flex-start' }} width="100%">
            <Icon as={FaEnvelope} boxSize={4} />
            <Text>abc@gmail.com</Text>
          </HStack>
        </VStack>

        {/* About Us Section */}
        <VStack 
          align={{ base: 'center', md: 'flex-start' }} 
          spacing={2} 
          mb={{ base: 8, md: 0 }}
          width={{ base: '100%', md: 'auto' }}
        >
          <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>About us</Text>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Search</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Introduction</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Payment Change Policy</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Main delivery</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Policy payment</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Buying guide</Link>
          <Link href="#" _hover={{ textDecoration: 'underline' }}>Service account</Link>
        </VStack>

        {/* Sign-up Section */}
        <VStack 
          align={{ base: 'center', md: 'flex-start' }} 
          spacing={4}
          width={{ base: '100%', md: 'auto' }}
        >
          <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>Sign up to receive promotions</Text>
          <HStack as="form" width="100%" justify={{ base: 'center', md: 'flex-start' }}>
            <Input 
              placeholder="Nhập email của bạn" 
              size="sm" 
              bg="white" 
              color="black" 
              _placeholder={{ color: 'gray.500' }}
              maxWidth={{ base: '200px', md: '250px' }}
            />
            <Button size="sm" colorScheme="blue">Gửi</Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
}

