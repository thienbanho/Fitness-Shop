import React from "react";
import { Box, Flex, Image, Text, VStack, Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <Box bg="black" color="white" fontFamily="Arial, sans-serif">
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <Box
        bgImage="url(/src/assets/hero.png)"
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        textAlign="left"
        minHeight="92vh"
        py={0}
        px={0}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <VStack
          spacing={0}
          align="flex-start"
          ml={"5%"}
          mt={"2%"}
        >
          <Heading
            fontSize={"150px"}
            color="yellow.500"
          >
            STRONGER
          </Heading>
          <Heading
            fontSize={"150px"}
            fontFamily="'Bebas Neue', sans-serif"
            color="transparent"
            sx={{
              WebkitTextStroke: '2px yellow',
              textStroke: '2px white',
            }}
          >
            EVERYDAY
          </Heading>
          <Heading
            fontSize={"150px"}
            color="yellow.500"
          >
            FITTER
          </Heading>
          <Heading
            fontSize={"150px"}
            fontFamily="'Bebas Neue', sans-serif"
            color="transparent"
            sx={{
              WebkitTextStroke: '2px yellow',
              textStroke: '2px white',
            }}
          >
            FOREVER
          </Heading>
        </VStack>

        {/* Scroll Down Text */}
        <Box
          mt="auto"
          textAlign="center"
          mb={5}
        >
          <Text
            fontSize={"20px"}
            color="white"
            fontWeight="bold"
          >
            Scroll Down for More Information
          </Text>
        </Box>
      </Box>

      {/* Product Section */}
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
              Discover top-quality supplements designed to boost strength, endurance, and recovery.<br/>
              Whether you're looking to build muscle or enhance performance, we have the perfect product for your fitness goals.<br/>
              Shop now and fuel your fitness journey!<br/>
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
          />
        </Flex>
      </Link>

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
          bg="gray.900"
          _hover={{
            bg: "gray.700",
            transform: "scale(1.02)",
            transition: "transform 0.3s ease, background-color 0.3s ease",
          }}
          cursor="pointer"
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
              Whether you're just starting your fitness journey or you're a pro looking to level up,<br/>
              we provide personalized guidance to help you progress toward your goals.<br/>
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
              Connect with others who share your fitness passion and exchange experiences.<br/>
              Get expert advice, motivation, and tips to help you stay on track.<br/>
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
          />
        </Flex>
      </Link>

      {/* Footer Section */}
      <Footer />
    </Box>
  );
}

export default Home;
