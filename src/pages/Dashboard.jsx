import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "/HCMUS/Software Engineering/pj/fitness-shop/src/components/NavBar/NavBar.jsx"; // Navbar Component
import Footer from "/HCMUS/Software Engineering/pj/fitness-shop/src/components/Footer/Footer.jsx"; // Footer Component

export default function Dashboard() {
  const boxStyles = {
    p: "10px",
    bg: "purple.400",
    color: "white",
    m: "10px",
    textAlign: "center",
    ":hover": {
      color: "black",
    },
    filter: "blur(2px)",
  };

  // Responsive breakpoints
  const sidebarWidth = useBreakpointValue({ base: "0", md: "250px" }); // Sidebar disappears on small screens
  const contentMarginLeft = useBreakpointValue({ base: "0", md: "250px" }); // Adjust content margin based on screen size

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Navbar */}
      <Box as="header" width="100%" position="fixed" top="0" zIndex="10">
        <Navbar />
      </Box>

      {/* Main Content */}
      <Flex flex="1" pt="60px" mt="60px">
        {" "}
        {/* Add `pt` and `mt` to push content below Navbar */}
        {/* Main Content Area */}
        <Container
          as="main"
          maxWidth="4xl"
          height="calc(100vh - 60px)"
          px="4"
          py="6"
          flex="1"
          ml={contentMarginLeft} // Adjust margin to respect the sidebar width
        >
          <Heading my="30px" p="10px">
            Chakra UI Components
          </Heading>

          <Text marginLeft="30px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            minima impedit inventore facilis amet, doloremque repellat dicta
            officia.
          </Text>

          <Text ml="30px" color="blue.300" fontWeight="bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            minima impedit inventore facilis amet, doloremque repellat dicta
            officia.
          </Text>

          <Box my="30px" p="20px" bg="orange">
            <Text color="white">This is a Box</Text>
          </Box>

          <Box sx={boxStyles}>Hello, Ninjas!</Box>
        </Container>
      </Flex>

      {/* Footer */}
      <Box as="footer" width="100%" bg="black" color="white" py="4">
        <Footer />
      </Box>
    </Flex>
  );
}
