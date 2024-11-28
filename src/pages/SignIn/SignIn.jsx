'use client'

import { useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import supabase from "../../config/supabaseClient";
import { FcGoogle} from "react-icons/fc";
import { FaFacebook} from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle the form submission and Supabase authentication
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error messages

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message); // Set the error message if login fails
    } else {
      // Successful login, redirect to profile or another page
      window.location.href = '/profile'; // Replace with your desired redirect
    }
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    
    if (error) {
      console.error("Google login error:", error.message);
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user data:", userError.message);
      return;
    }
    
    const user = userData.user;
    await supabase.from('users').insert([
      {
        username: user.user_metadata.full_name || user.email,
        password:'', // Storing the password as plain text (not recommended)
        email: user.email,
        role: 'user',
      }, ]);

  };

  const handleFacebookLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "http://localhost:5173", 
      },
    });

    if (error) {
      console.error("Error during Facebook login:", error.message);
      alert(`Error during Facebook login: ${error.message}`);
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user data:", userError.message);
      return;
    }
    
    const user = userData.user;
    await supabase.from('users').insert([
      {
        username: user.user_metadata.full_name || user.email,
        password:'', // Storing the password as plain text (not recommended)
        email: user.email,
        role: 'user',
      }, ]);
  
    
  };


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              {error && <Text color="red.500">{error}</Text>} {/* Display error message */}
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignIn}>
                Sign in
              </Button>
              <Stack spacing={3}>
                <Button
                  leftIcon={<FcGoogle />}
                  bg="white"
                  color="black"
                  border="1px"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  onClick={handleGoogleLogin}>
                  Sign in with Google
                </Button>
                <Button
                  leftIcon={<FaFacebook />}
                  bg="white"
                  color="black"
                  border="1px"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.100" }}
                  onClick={handleFacebookLogin}>
                  Sign in with Facebook
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
