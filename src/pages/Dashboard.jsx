import { Box, Container, Heading, Text, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar"; // Sidebar Component
import Navbar from "../components/NavBar/NavBar";   // Navbar Component

export default function Dashboard() {

  const boxStyles = {
    p: "10px",
    bg: "purple.400",
    color: "white",
    m: "10px",
    textAlign: 'center',
    ':hover': {
      color: 'black',
    },
    filter: 'blur(2px)'
  };

  return (
    <Flex direction="column" height="100vh">
      {/* Navbar */}
      <Box as="header" width="100%" zIndex="10" position="fixed">
        <Navbar />
      </Box>

      {/* Content Section */}
      <Flex flex="1" pt="60px"> {/* Add padding to prevent overlap with the Navbar */}
        {/* Sidebar */}
        <Box as="aside" width="250px" bg="gray.100" height="calc(100vh - 60px)" position="fixed">
          <Sidebar />
        </Box>

        {/* Main Content */}
        <Container
          as="main"
          maxWidth="4xl"
          ml="250px"
          px="4"
          py="6"
        >
          <Heading my="30px" p="10px">Chakra UI Components</Heading>

          <Text marginLeft="30px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima impedit inventore facilis amet, doloremque repellat dicta officia
          </Text>

          <Text ml="30px" color="blue.300" fontWeight="bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima impedit inventore facilis amet, doloremque repellat dicta officia
          </Text>

          <Box my="30px" p="20px" bg="orange">
            <Text color="white">This is a Box</Text>
          </Box>

          <Box sx={boxStyles}>Hello, Ninjas!</Box>
        </Container>
      </Flex>
    </Flex>
  );
}
