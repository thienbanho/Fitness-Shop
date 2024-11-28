import { Box, Text, VStack, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Dumbbell, Users, ShoppingBag, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <Box className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <Box
          bgImage="url('/placeholder.svg?height=1080&width=1920')"
          bgSize="cover"
          bgPosition="center"
          h="50vh"
          position="relative"
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
            <Text fontSize="4xl" fontWeight="bold" color="white" mb={4}>
              About Fitness Shop
            </Text>
            <Text fontSize="xl" color="white">
              Your One-Stop Destination for Fitness
            </Text>
          </Flex>
        </Box>

        {/* Mission Section */}
        <Box py={16} bg="gray.100" textAlign="center">
          <Box maxW="2xl" mx="auto" px={4}>
            <Text fontSize="3xl" fontWeight="bold" mb={8}>
              Our Mission
            </Text>
            <Text fontSize="lg">
              At Fitness Shop, we're dedicated to helping you achieve your
              fitness goals. We provide top-quality equipment and expert
              guidance to support your journey to a healthier, stronger you.
            </Text>
          </Box>
        </Box>

        {/* Products and Services Section */}
        <Box py={16} bg="gray.50">
          <Box maxW="7xl" mx="auto" px={4} >
            <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={12}>
              What We Offer
            </Text>
            <Flex wrap="wrap" gap={30} columnGap={60} justify="center" >
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
            </Flex>
          </Box>
        </Box>

        {/* Personal Training Section */}
        <Box py={16} bg="white">
          <Flex direction={{ base: "column", md: "row" }} align="center" px={4}>
            <Box flex="1" textAlign="center" mb={{ base: 8, md: 0 }}>
              <img
                src="/src/assets/PTSection.png"
                alt="Personal trainer with client"
                style={{ borderRadius: "8px" }}
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
        </Box>

        {/* Call to Action Section */}
        <Box py={16} bg="blackAlpha.800" color="white" textAlign="center">
          <Box maxW="2xl" mx="auto" px={4}>
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              Ready to Start Your Fitness Journey?
            </Text>
            <Text fontSize="xl" mb={8}>
              Explore our products or book a session with one of our expert
              trainers today!
            </Text>
            <Flex justify="center" gap={4}>
              <Button as={Link} to="/products" variant="solid" colorScheme="gray" bg="white" textColor="blackAlpha.600">
                Shop Products
              </Button>
              <Button as={Link} to="/" variant="solid" colorScheme="whiteAlpha" bg="grey" textColor="whiteAlpha">
                Back to Home
              </Button>
            </Flex>
          </Box>
        </Box>
      </main>
    </Box>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <Box
      w="300px"
      bg="white"
      p={6}
      shadow="md"
      borderRadius="md"
      textAlign="center"
      border="1px"
      borderColor="gray.200"
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
    </Box>
  );
}
