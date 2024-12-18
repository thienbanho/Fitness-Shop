'use client'
'use client'

import React, { useState } from 'react';
import { Box, Flex, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Text, Link, Image, Divider, useColorModeValue, useToast } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import supabase from "../../config/supabaseClient";
import Logo from "../../assets/logo.png"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSignUp = async () => {
    setLoading(true);

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, firstName, lastName },
      },
    });

    if (error) {
      toast({
        title: "Sign-up failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    const { data, insertError } = await supabase.from('users').insert([{
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
      role: 'user',
    }]);

    if (insertError) {
      toast({
        title: "Database Error",
        description: insertError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Your account has been created!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
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
    await supabase.from('users').insert([{
      username: user.user_metadata.full_name || user.email,
      password: '',
      email: user.email,
      role: 'user',
    }]);
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
      toast({
        title: "Facebook Login Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user data:", userError.message);
      return;
    }
    
    const user = userData.user;
    await supabase.from('users').insert([{
      username: user.user_metadata.full_name || user.email,
      password: '',
      email: user.email,
      role: 'user',
    }]);
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius="lg"
        textAlign="center"
        boxShadow="xl"
        bg={useColorModeValue('white', 'gray.700')}
        transition="all 0.3s ease"
        _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }}
      >
        <Box p={6}>
          <VStack spacing={6} align="stretch">
            <Image src={Logo} alt="The Fitness Shop" height="60px" mx="auto" />
            <Text fontSize="xl" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>
              Your Fitness Hub – Everything You Need to Train, Fuel, and Succeed!
            </Text>
            <Box as="form">
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((prevState) => !prevState)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  isLoading={loading}
                  loadingText="Signing up"
                  colorScheme="red"
                  width="full"
                  onClick={handleSignUp}
                  _hover={{ bg: 'red.600' }}
                >
                  Sign up
                </Button>
              </VStack>
            </Box>
            <VStack spacing={4} align="stretch">
              <Divider />
              <Text textAlign="center" color="gray.500">OR</Text>
              <Button
                leftIcon={<FaFacebook />}
                colorScheme="facebook"
                onClick={handleFacebookLogin}
                width="full"
                _hover={{ bg: 'facebook.600' }}
              >
                Sign up with Facebook
              </Button>
              <Button
                leftIcon={<FcGoogle />}
                onClick={handleGoogleLogin}
                width="full"
                _hover={{ bg: 'gray.200' }}
              >
                Sign up with Google
                Sign up with Google
              </Button>
            </VStack>
            <Text fontSize="sm" color="gray.500">
              Already have an account?{' '}
              <Link color="blue.500" href="/SignIn">
                Sign in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
