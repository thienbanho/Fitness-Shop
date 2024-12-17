'use client'

import { useState } from 'react';
import { 
  Box, 
  Flex, 
  VStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Link,
  Image,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import supabase from "../../config/supabaseClient";
import Logo from "../../assets/logo.png"

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/profile';
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
        password: '',
        email: user.email,
        role: 'user',
      },
    ]);
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
        password: '',
        email: user.email,
        role: 'user',
      },
    ]);
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Box p={4}>
          <VStack spacing={8} align="stretch" >
            <Image src={Logo} alt="The Fitness Shop" height="60px" mx="auto" />
            <Text fontSize="xl" fontWeight="semibold">
              Your Fitness Hub – Everything You Need to Train, Fuel, and Succeed!
            </Text>
            <Box as="form" onSubmit={handleSignIn}>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel htmlFor="email">Email or phone number</FormLabel>
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormControl>
                <Flex justify="space-between" align="center">
                  <Checkbox
                    isChecked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="blue.500" href="/forgot-password">
                    Forgot Password?
                  </Link>
                </Flex>
                {error && <Text color="red.500">{error}</Text>}
                <Button type="submit" colorScheme="red" width="full">
                  Login
                </Button>
              </VStack>
            </Box>
            <VStack spacing={4} align="stretch">
              <Divider />
              <Text textAlign="center">OR</Text>
              <Button
                leftIcon={<FaFacebook />}
                colorScheme="facebook"
                onClick={handleFacebookLogin}
                width="full"
              >
                Facebook
              </Button>
              <Button
                leftIcon={<FcGoogle />}
                onClick={handleGoogleLogin}
                width="full"
              >
                Google
              </Button>
            </VStack>
            <Text fontSize="sm">
              Don't have an account yet?{' '}
              <Link color="blue.500" href="/signup">
                Sign up
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}

