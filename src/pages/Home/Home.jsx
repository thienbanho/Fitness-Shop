import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../hooks/Auth";
import supabase from "../../config/supabaseClient";

function Home() {
  const { user } = useAuth();
  console.log("Hehe: ", user);

  useEffect(() => {
    if (!user) return;
    const insertUsers = async () => {
      const { data: existingUser } = await supabase
      .from('users')
      .select()
      .or(`username.eq.${user.email},email.eq.${user.email}`)
      .single();

      if (!existingUser) {
      await supabase.from('users').insert([{
        username: user.email,
        full_name: user.user_metadata?.full_name || user.email,
        password: '',
        email: user.email,
        role: 'user',
      }]);
      }
    }
    insertUsers();
  });

  return (
    <Box bg="black" color="white" fontFamily="Arial, sans-serif">

      {/* Hero Section */}
      <Box
        id="hero-section"
        display="flex"
        flexDirection="row"
        alignItems="center"
        bgImage="url(/src/assets/herobg.jpg)"
        bgPosition="center"
        bgSize="cover"
        minHeight="92vh"
        bgAttachment="fixed"
      >
        <Box
          flex="1"
          bgImage="url(/src/assets/hero.png)"
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          minHeight="92vh"
        />
        <Box
          flex="1"
          mt={100}
          py={3}
          px={8}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          color="white"
        >
          <Heading mt={-5}>
            <Text as="span" fontSize="40" color="green">BUILD </Text>
            <Text as="span" fontSize="70" color="white">YOUR BODY</Text>
          </Heading>

          <Heading mt={-5}>
            <Text as="span" fontSize="40" color="green">TRANSFORM </Text>
            <Text as="span" fontSize="60" color="white">YOUR LIFE</Text>
          </Heading>

          <Heading fontSize="150" mt={5}>
            <Text as="span" color="black">STRONG</Text>
            <Text as="span" color="red.600">ER</Text>
          </Heading>

          <Box mt={100}>
            <Image
              src="/src/assets/eye.png"
              alt="Eye Icon"
              boxSize="100px"
              mx="auto"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: 'rotate(360deg)' }}
            />
          </Box>

          <Text fontSize="15" color="black" mb={4}>
            WE ARE HERE FOR YOU
          </Text>

          <Heading
            fontSize="25"
            fontWeight="bold"
            color="black"
            mb={4}
            letterSpacing="1px"
            textShadow="2px 2px 10px rgba(0, 0, 0, 0.5)"
          >
            WE ARE THE PEOPLE
            <br />
            WHO WILL EMPOWER YOUR FITNESS JOURNEY
          </Heading>

          <Button
            bg="black"
            color="white"
            w={40}
            mt={35}
            _hover={{ bg: "gray.700", transform: "scale(1.05)", transition: "transform 0.3s ease" }}
            borderRadius="md"
            boxShadow="lg"
            onClick={() => {
              const section = document.getElementById("product-section");
              section.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore More
          </Button>
        </Box>
      </Box>

      {/* Product Section */}
      <Box id="product-section">
        <Link
          to="/product"
          _hover={{ textDecoration: "none" }}
        >
          <Flex
            direction={"row"}
            py={16}
            px={10}
            alignItems="center"
            bg="gray.900"
            _hover={{
              bg: "gray.700",
              transform: "scale(1.02)",
              transition: "transform 0.3s ease, background-color 0.3s ease",
            }}
            cursor="pointer"
            boxShadow="md"
            borderRadius="lg"
          >
            <VStack
              align="start"
              flex={1}
              spacing={4}
              pr={8}
              ml={"2%"}
            >
              <Text fontSize="clamp(8px, 3vw, 20px)" color="gray.400">
                PRODUCT
              </Text>

              <Heading
                fontSize="clamp(32px, 5vw, 72px)"
                fontWeight="bold"
                color="white"
                letterSpacing="2px"
                textShadow="2px 2px 5px rgba(0, 0, 0, 0.3)"
              >
                <Text as="span" color="white">Explore our </Text>
                <Text as="span" color="red.600">Products</Text>
              </Heading>

              <Text
                color="gray.300"
                fontStyle="italic"
                fontSize="clamp(16px, 3vw, 28px)"
                pt={4}
              >
                Enhance Your Workout with Premium Supplements
              </Text>

              <Text
                color="gray.200"
                fontSize="clamp(8px, 3vw, 18px)"
              >
                Discover top-quality supplements designed to boost strength, endurance, and recovery.<br />
                Whether you're looking to build muscle or enhance performance, we have the perfect product for your fitness goals.<br />
                Shop now and fuel your fitness journey!<br />
              </Text>
            </VStack>
            <Image
              src="/src/assets/product.png"
              alt="Product"
              flex={1}
              objectFit="cover"
              maxWidth={"40%"}
              height="auto"
              marginRight="2%"
              boxShadow="xl"
              borderRadius="md"
            />
          </Flex>
        </Link>
      </Box>

      {/* Personal Trainer Section */}
      <Link
        to="/trainer"
        _hover={{ textDecoration: "none" }}
      >
        <Flex
          direction={"row-reverse"}
          py={16}
          px={10}
          alignItems="center"
          bg="gray.1000"
          _hover={{
            bg: "gray.700",
            transform: "scale(1.02)",
            transition: "transform 0.3s ease, background-color 0.3s ease",
          }}
          cursor="pointer"
          boxShadow="md"
          borderRadius="lg"
        >
          <VStack
            align="start"
            flex={1}
            spacing={4}
            pr={8}
            ml={"16%"}
          >
            <Text fontSize="clamp(8px, 3vw, 20px)" color="gray.400">
              PERSONAL TRAINER
            </Text>

            <Heading
              fontSize="clamp(32px, 5vw, 72px)"
              fontWeight="bold"
              color="white"
              textShadow="2px 2px 5px rgba(0, 0, 0, 0.5)"
            >
              <Text as="span" color="white">Get Expert </Text>
              <Text as="span" color="cyan.500">Guidance</Text>
            </Heading>

            <Text
              color="gray.300"
              fontStyle="italic"
              fontSize="clamp(16px, 3vw, 28px)"
              pt={4}
            >
              Boost Your Performance with Expert Fitness Advice
            </Text>

            <Text
              color="gray.200"
              fontSize="clamp(8px, 3vw, 18px)"
            >
              Whether you're just starting your fitness journey or you're a pro looking to level up,<br />
              we provide personalized guidance to help you progress toward your goals.<br />
              Book a session today and start your journey toward your best results!
            </Text>
          </VStack>
          <Image
            src="/src/assets/trainer.png"
            alt="Trainer"
            flex={1}
            objectFit="cover"
            maxWidth={"40%"}
            height="auto"
            ml="2%"
            boxShadow="xl"
            borderRadius="md"
          />
        </Flex>
      </Link>

      {/* Forum Section */}
      <Link
        to="/forum"
        _hover={{ textDecoration: "none" }}
      >
        <Flex
          direction={"row"}
          py={16}
          px={10}
          alignItems="center"
          bg="gray.900"
          _hover={{
            bg: "gray.700",
            transform: "scale(1.02)",
            transition: "transform 0.3s ease, background-color 0.3s ease",
          }}
          cursor="pointer"
          boxShadow="md"
          borderRadius="lg"
        >
          <VStack
            align="start"
            flex={1}
            spacing={4}
            pr={8}
            ml={"2%"}
          >
            <Text fontSize="clamp(8px, 3vw, 20px)" color="gray.400">
              FORUM
            </Text>

            <Heading
              fontSize="clamp(32px, 5vw, 72px)"
              fontWeight="bold"
              color="white"
              textShadow="2px 2px 5px rgba(0, 0, 0, 0.5)"
            >
              <Text as="span" color="white">Join our </Text>
              <Text as="span" color="green.500">Community</Text>
            </Heading>

            <Text
              color="gray.300"
              fontStyle="italic"
              fontSize="clamp(16px, 3vw, 28px)"
              pt={4}
            >
              Be Part of Our Fitness Family
            </Text>

            <Text
              color="gray.200"
              fontSize="clamp(8px, 3vw, 18px)"
            >
              Connect with others who share your fitness passion and exchange experiences.<br />
              Get expert advice, motivation, and tips to help you stay on track.<br />
              Our forum is the ideal space to find support and stay inspired on your fitness journey.
            </Text>
          </VStack>
          <Image
            src="/src/assets/forum.png"
            alt="Forum"
            flex={1}
            objectFit="cover"
            maxWidth={"40%"}
            height="auto"
            marginRight="2%"
            boxShadow="xl"
            borderRadius="md"
          />
        </Flex>
      </Link>

      {/* Back to First Icon */}
      <Box
        position="fixed"
        bottom={4}
        right={4}
        zIndex="10"
        bg="gray.600"
        borderRadius="full"
        p={3}
        boxShadow="lg"
        cursor="pointer"
        _hover={{ bg: "green.800" }}
        onClick={() => {
          const section = document.getElementById("hero-section");
          section.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <Image
          src="/src/assets/icon.png"
          alt="Icon"
          boxSize="40px"
        />
      </Box>

    </Box>
  );
}

export default Home;
