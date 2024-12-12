'use client';

import { Heading, Avatar, Box, Center, Image, Flex, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from "../../hooks/Auth"; // Import useAuth hook
import supabase from "../../config/supabaseClient";

export default function Profile() {
  const { user, setUser } = useAuth(); // Use auth hook to get user info

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Update user state to null after logging out
  };

  if (!user) {
    return (
      <Center py={6}>
        <Text>You need to log in to see your profile.</Text>
      </Center>
    );
  }

  return (
    <Center py={6}>
      <Box
        maxW={'320px'} // Adjusted for better responsiveness
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        _hover={{ boxShadow: 'xl', transform: 'scale(1.02)' }} // Subtle hover effect
        transition="transform 0.3s ease, box-shadow 0.3s ease"
      >
        <Image
          h={'120px'}
          w={'full'}
          src={user.avatar_url || 'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'}
          objectFit="cover"
          alt="Profile Background"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={user.avatar_url || 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/452346596_122164584326174919_4892755229233025321_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFkCuZGcWmgueI69DCFiz53wibW2MoeTvHCJtbYyh5O8YvY9JYPHuR4Mhn6WvIKS63P-DZrX5XPXdD6EF41w1yS&_nc_ohc=hchFGJy9LoQQ7kNvgF1oINz&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=Al9O8TIVfV5SIR_Zs4aepxr&oh=00_AYB1Zuj5DLL_VpVmfSCzK0r6MA8R56tn0Ex2az7rel2m1A&oe=674C7809'}
            css={{
              border: '4px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {user.name || 'Your Name'} {/* Display user name if available */}
            </Heading>
            <Text color={'gray.500'}>{user.email}</Text> {/* Display user email */}
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Following
              </Text>
            </Stack>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={logout} // Logout on button click
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
