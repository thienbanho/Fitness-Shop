import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Dumbbell, Users, ShoppingBag, Award } from "lucide-react";
import PTSection from "/src/assets/PTSection.png";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

export default function AboutPage() {
  return (
    <Box className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <MotionBox
          bgImage="url('/placeholder.svg?height=1080&width=1920')"
          bgSize="cover"
          bgPosition="center"
          h="50vh"
          position="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box bg="blackAlpha.500" position="absolute" inset="0" />
          <Flex
            direction="column"
            align="center"
            justify="center"
            position="relative"
            zIndex={10}
            h="100%"
            textAlign="center"
          >
            <MotionText
              fontSize="4xl"
              fontWeight="bold"
              color="white"
              mb={4}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              About Fitness Shop
            </MotionText>
            <MotionText
              fontSize="xl"
              color="white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Your One-Stop Destination for Fitness
            </MotionText>
          </Flex>
        </MotionBox>

        {/* Mission Section */}
        <MotionBox
          py={16}
          bg="gray.100"
          textAlign="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box maxW="2xl" mx="auto" px={4}>
            <MotionText
              fontSize="3xl"
              fontWeight="bold"
              mb={8}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Our Mission
            </MotionText>
            <Text fontSize="lg">
              At Fitness Shop, we're dedicated to helping you achieve your
              fitness goals. We provide top-quality equipment and expert
              guidance to support your journey to a healthier, stronger you.
            </Text>
          </Box>
        </MotionBox>

        {/* Products and Services Section */}
        <MotionBox
          py={16}
          bg="gray.50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box maxW="7xl" mx="auto" px={4}>
            <MotionText
              fontSize="3xl"
              fontWeight="bold"
              textAlign="center"
              mb={12}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              What We Offer
            </MotionText>
            <MotionFlex
              wrap="wrap"
              gap={30}
              columnGap={60}
              justify="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <ServiceCard
                icon={<Dumbbell />}
                title="Equipment"
                description="High-quality fitness equipment for home and commercial use."
              />
              <ServiceCard
                icon={<ShoppingBag />}
                title="Accessories"
                description="A wide range of fitness accessories to complement your workout."
              />
              <ServiceCard
                icon={<Users />}
                title="Personal Training"
                description="Expert personal trainers to guide you on your fitness journey."
              />
              <ServiceCard
                icon={<Award />}
                title="Nutrition"
                description="Nutritional supplements and advice for optimal performance."
              />
            </MotionFlex>
          </Box>
        </MotionBox>

        {/* Personal Training Section */}
        <MotionBox
          py={16}
          bg="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Flex direction={{ base: "column", md: "row" }} align="center" px={4}>
            <Box flex="1" textAlign="center" mb={{ base: 8, md: 0 }}>
              <motion.img
                src={PTSection}
                alt="Personal trainer with client"
                style={{ borderRadius: "8px" }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </Box>
            <Box flex="1" textAlign={{ base: "center", md: "left" }} pl={{ md: 8 }}>
              <Text fontSize="3xl" fontWeight="bold" mb={4}>
                Expert Personal Training
              </Text>
              <Text fontSize="lg" mb={6}>
                Our certified personal trainers are here to help you reach your
                fitness goals. Whether you're just starting out or looking to
                take your fitness to the next level, we have the expertise to
                guide you every step of the way.
              </Text>
              <Button as={Link} to="/personal-training" colorScheme="red">
                Learn More About Personal Training
              </Button>
            </Box>
          </Flex>
        </MotionBox>

        {/* Call to Action Section */}
        <MotionBox
          py={16}
          bg="blackAlpha.800"
          color="white"
          textAlign="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box maxW="2xl" mx="auto" px={4}>
            <MotionText
              fontSize="3xl"
              fontWeight="bold"
              mb={4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Ready to Start Your Fitness Journey?
            </MotionText>
            <Text fontSize="xl" mb={8}>
              Explore our products or book a session with one of our expert
              trainers today!
            </Text>
            <Flex justify="center" gap={4}>
              <Button as={Link} to="/products" variant="solid" colorScheme="gray" bg="white" textColor="blackAlpha.600">
                Shop Products
              </Button>
              <Button as={Link} to="/home" variant="solid" colorScheme="whiteAlpha" bg="grey" textColor="whiteAlpha">
                Back to Home
              </Button>
            </Flex>
          </Box>
        </MotionBox>
      </main>
    </Box>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <MotionBox
      w="300px"
      bg="white"
      p={6}
      shadow="md"
      borderRadius="md"
      textAlign="center"
      border="1px"
      borderColor="gray.200"
      whileHover={{ scale: 1.05 }}
      transition="all 0.3s ease-in-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box fontSize="2xl" mb={4}>
        {icon}
      </Box>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text fontSize="md" color="gray.600">
        {description}
      </Text>
    </MotionBox>
  );
}
