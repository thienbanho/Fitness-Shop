'use client';
import { FcGoogle} from "react-icons/fc";
import { FaFacebook} from "react-icons/fa";
import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import supabase from "../../config/supabaseClient";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Add state for username
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSignUp = async () => {
    setLoading(true);

    // Sign up with Supabase authentication
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
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

    // Insert user data into the Users table without hashing the password
    const { data, insertError } = await supabase.from('users').insert([
      {
        username,
        password, // Storing the password as plain text (not recommended)
        email,
        role: 'user',
      },
    ]);

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
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
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
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={loading}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignUp}
              >
                Sign up
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
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link color={'blue.400'} href="/SignIn">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
