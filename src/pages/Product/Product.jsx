import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Input,
    Flex,
    Image,
    SimpleGrid,
    Text,
    Heading,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    useToast,
    Link,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation from react-router-dom
import supabase from "../../config/supabaseClient";
import ProductCard from "../../components/ProductCard/ProductCard";

// Category Images
import WheyProteinImage from "../../assets/ProductTypes/whey-protein.png";
import MassGainerImage from "../../assets/ProductTypes/mass-gainer.png";
import BCAAImage from "../../assets/ProductTypes/bcaa.png";
import PreWorkout from "../../assets/ProductTypes/pre-workout.png";
import VitaminsImage from "../../assets/ProductTypes/omega3.png";
import SupplementsImage from "../../assets/ProductTypes/supplements.png";

const categories = [
    { title: "Whey Protein", image: WheyProteinImage },
    { title: "Mass Gainer", image: MassGainerImage },
    { title: "BCAA - EAA - Amino Acid", image: BCAAImage },
    { title: "Tăng sức mạnh", image: PreWorkout },
    { title: "Vitamin - D3&K2 - Dầu Cá", image: VitaminsImage },
    { title: "Thực phẩm chức năng", image: SupplementsImage },
];

const Product = () => {
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState(50000000);
    const [brand, setBrand] = useState("");
    const [kind, setKind] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // New state for search query
    const toast = useToast();
    const isHorizontal = useBreakpointValue({ base: false, md: true });
    const navigate = useNavigate(); // Use navigate for routing
    const location = useLocation(); // Use location to access query parameters

    useEffect(() => {
        const fetchProducts = async () => {
            const queryParams = new URLSearchParams(location.search); // Get the search query from URL
            const search = queryParams.get("search") || ""; // Get the 'search' query parameter

            const { data, error } = await supabase
                .from("products")
                .select("*")
                .ilike("name", `%${search}%`); // Filter products by search query

            if (error) {
                toast({
                    title: "Error fetching products",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                setProducts(data);
            }
        };

        fetchProducts();
    }, [location.search, toast]); // Fetch products when the search query changes

    // Handle search and update URL
    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery) {
            navigate(`/Product?search=${searchQuery}`); // Update URL with search query
        }
    };

    return (
        <Box p={4} bg="#F9F9F9" minH="100vh">
            {/* Category Section */}
            <Box maxW="1298px" mx="auto" py={6} px={4} bg="white" borderRadius="lg" shadow="md">
                <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={6}>
                    Danh Mục Nổi Bật
                </Text>
                <Flex
                    direction={isHorizontal ? "row" : "column"}
                    justifyContent="center"
                    alignItems="center"
                    wrap="wrap"
                    gap={6}
                >
                    {categories.map((category, index) => (
                        <VStack
                            key={index}
                            spacing={2}
                            align="center"
                            _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
                            transition="transform 0.2s"
                        >
                            <Image src={category.image} alt={category.title} boxSize="80px" />
                            <Text fontSize="sm" fontWeight="medium" textAlign="center">
                                {category.title}
                            </Text>
                        </VStack>
                    ))}
                </Flex>
            </Box>

            {/* Filter and Products Section */}
            <Flex mt={10} maxW="1298px" mx="auto" gap={8} direction={{ base: "column", md: "row" }}>
                {/* Filter Section */}
                <Box bg="white" p={6} borderRadius="lg" shadow="md" flexShrink={0} width={{ base: "100%", md: "300px" }}>
                    <VStack spacing={6} align="stretch">
                        {/* Search */}
                        <Box>
                            <Heading size="sm" mb={2} color="blue.600">
                                Search
                            </Heading>
                            <Input
                                placeholder="Search products..."
                                variant="outline"
                                size="sm"
                                borderRadius="md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                                onKeyDown={handleSearch} // Handle search on Enter key press
                            />
                        </Box>

                        {/* Price Range */}
                        <Box>
                            <Heading size="sm" mb={2} color="blue.600">
                                Price Range
                            </Heading>
                            <Slider
                                defaultValue={50000000}
                                min={10000}
                                max={100000000}
                                step={10000}
                                onChange={(val) => setPriceRange(val)}
                            >
                                <SliderTrack bg="gray.200">
                                    <SliderFilledTrack bg="blue.500" />
                                </SliderTrack>
                                <SliderThumb boxSize={4} />
                            </Slider>
                            <Text fontSize="sm" mt={2} color="gray.600">
                                Up to {priceRange.toLocaleString()} VND
                            </Text>
                        </Box>

                        {/* Brand */}
                        <Box>
                            <Heading size="sm" mb={2} color="blue.600">
                                Brand
                            </Heading>
                            <Input
                                placeholder="Type brand..."
                                variant="outline"
                                size="sm"
                                borderRadius="md"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Box>

                        {/* Kind */}
                        <Box>
                            <Heading size="sm" mb={2} color="blue.600">
                                Kind
                            </Heading>
                            <Input
                                placeholder="Type kind..."
                                variant="outline"
                                size="sm"
                                borderRadius="md"
                                value={kind}
                                onChange={(e) => setKind(e.target.value)}
                            />
                        </Box>
                    </VStack>
                </Box>

                {/* Products Section */}
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3 }}
                    spacing={6}
                    flex="1"
                    minChildWidth="250px"
                >
                    {products.map((product) => (
                        <Link key={product.product_id} href={`/DetailProduct?product_id=${product.product_id}`} style={{ textDecoration: "none" }}>
                            <Box
                                bg="white"
                                p={4}
                                borderRadius="lg"
                                boxShadow="sm"
                                transition="all 0.2s ease-in-out"
                                _hover={{
                                    boxShadow: "lg",
                                    transform: "translateY(-5px)",
                                }}
                            >
                                <ProductCard product={product} />
                            </Box>
                        </Link>
                    ))}
                </SimpleGrid>
            </Flex>
        </Box>
    );
};

export default Product;
