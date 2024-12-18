import React, { useState, useEffect } from "react";
import {
    Box,
    IconButton,
    Heading,
    VStack,
    useToast,
    Input,
    Checkbox,
    Flex, 
    GridItem, 
    Image, 
    SimpleGrid, 
    Text, 
    useBreakpointValue, 
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

import ProductCard from "../../components/ProductCard/ProductCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import WithSubnavigation from "../../components/NavBar/NavBar";

// category
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

// const CategorySection = () => {
//     const isDesktop = useBreakpointValue({ base: false, md: true });
//     const [isExpanded, setIsExpanded] = useState(false);

//     return (
//         <Box maxW="1298px" border="solid" py={4} px="30px" bg="white" boxShadow="md">
//             {isDesktop || isExpanded ? (
//                 <>
//                     <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
//                         DANH MỤC NỔI BẬT
//                     </Text>
//                     <Flex
//                         direction="row"
//                         align="center"
//                         justify="space-between"
//                         wrap="wrap"
//                         gap={4}
//                     >
//                         {categories.map((category, index) => (
//                             <VStack
//                                 key={index}
//                                 spacing={2}
//                                 align="center"
//                                 w="auto"
//                                 _hover={{ cursor: "pointer" }}
//                             >
//                                 <Box
//                                     bg="white"
//                                     borderRadius="full"
//                                     display="flex"
//                                     justifyContent="center"
//                                     alignItems="center"
//                                 >
//                                     <Image
//                                         src={category.image}
//                                         alt={category.title}
//                                         boxSize="80px"
//                                     />
//                                 </Box>
//                                 <Text fontSize="sm" fontWeight="medium" textAlign="center">
//                                     {category.title}
//                                 </Text>
//                             </VStack>
//                         ))}
//                     </Flex>
//                 </>
//             ) : (
//                 <Button onClick={() => setIsExpanded(true)} w="full" colorScheme="blue">
//                     Hiển thị danh mục
//                 </Button>
//             )}
//         </Box>
//     );
// };

const Product = () => {
    const [products, setProducts] = useState([]);
    const toast = useToast();
    const navigate = useNavigate();
    const isHorizontal = useBreakpointValue({ base: false, md: true });

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase.from("products").select("*");

            if (error) {
                console.error(error);
                toast({
                    title: "Error fetching products",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                setProducts(data); // Lưu dữ liệu vào state
            }
        };

        fetchProducts();
    }, [toast]);

    return (
        <Box p={4}>
            
            {/* <Sidebar />
            <VStack spacing={4}>
                {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </VStack> */}
            <Box mx="108px" mt="50px" mb="100px" align="center">
                <Box maxW="1298px" border="solid" py={4} px="30px" bg="white" boxShadow="md">
                    <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
                        DANH MỤC NỔI BẬT
                    </Text>
                    <Flex
                        direction={isHorizontal ? "row" : "column"}
                        align={isHorizontal ? "center" : "flex-start"}
                        justify={isHorizontal ? "space-between" : "center"}
                        wrap={isHorizontal ? "nowrap" : "wrap"}
                        gap={4}
                    >
                        {categories.map((category, index) => (
                        <VStack
                            key={index}
                            spacing={2}
                            align="center"
                            w={isHorizontal ? "auto" : "100%"}
                            _hover={{cursor: "pointer"}}
                        >
                            <Box
                            bg="white"
                            borderRadius="full"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            >
                            <Image
                                src={category.image}
                                alt={category.title}
                                boxSize="80px"
                            />
                            </Box>
                            <Text fontSize="sm" fontWeight="medium" textAlign="center">
                            {category.title}
                            </Text>
                        </VStack>
                        ))}
                    </Flex>
                </Box>
                
                <Flex mt="60px" verticalAlign="center">
                    <Box
                        maxW="298px"
                        h={{sm: "auto", m: "auto", lg: "848px"}}
                        p={{lg: "30px", sm:"20px"}}
                        ml={{sm: "-70px", lg: "0px"}}
                        bg="white"
                        border="solid"
                        mr={{lg: "100px", sm: "50px"}}
                    >
                        {/* Search Section */}
                        <VStack pb="30px" align="flex-start" spacing={4}>
                            <Heading mt="30px" as="h3" size="md" color="blue.600">
                                Search
                            </Heading>
                            <Input
                                placeholder="Search..."
                                variant="outline"
                                size="sm"
                                borderRadius="md"
                                bg="#D9D9D9"
                                border="solid"
                            />
                        </VStack>

                        {/* Filter Section */}
                        <VStack gap="40px" align="flex-start" spacing={4}>
                            <Heading mt="30px" as="h3" size="md" color="blue.600">
                                Filter
                            </Heading>

                            {/* Filter Categories */}
                            <Box ml={{lg: "20px", sm:"0px"}}>
                            <Text fontWeight="bold" fontSize="20px" mb={2}>
                                Price
                            </Text>
                            <VStack align="flex-start" spacing={2}>
                                <Checkbox size="lg">Option 1</Checkbox>
                                <Checkbox size="lg">Option 2</Checkbox>
                                <Checkbox size="lg">Option 3</Checkbox>
                                <Checkbox size="lg">Option 4</Checkbox>
                            </VStack>
                            </Box>

                            <Box ml={{lg: "20px", sm:"0px"}}>
                            <Text fontWeight="bold" fontSize="20px" mb={2}>
                                Brand
                            </Text>
                            <VStack align="flex-start" spacing={2}>
                                <Checkbox size="lg">Option 1</Checkbox>
                                <Checkbox size="lg">Option 2</Checkbox>
                                <Checkbox size="lg">Option 3</Checkbox>
                                <Checkbox size="lg">Option 4</Checkbox>
                            </VStack>
                            </Box>

                            <Box ml={{lg: "20px", sm:"0px"}}>
                            <Text fontWeight="bold" fontSize="20px" mb={2}>
                                Kind
                            </Text>
                            <VStack align="flex-start" spacing={2}>
                                <Checkbox size="lg">Option 1</Checkbox>
                                <Checkbox size="lg">Option 2</Checkbox>
                                <Checkbox size="lg">Option 3</Checkbox>
                                <Checkbox size="lg">Option 4</Checkbox>
                            </VStack>
                            </Box>
                        </VStack>
                    </Box>

                    <SimpleGrid  columnGap="100px" rowGap="100px" maxW={{lg: "700px", xl: "1000px" , sm: "250px"}} minChildWidth="252px">
                        {products.map((product) => (
                            <ProductCard key={product.product_id} product={product} />
                        ))}
                    </SimpleGrid>
                </Flex>  
            </Box>
        </Box>
    );
};

export default Product;
