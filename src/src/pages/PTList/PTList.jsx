import React, { useEffect, useState } from 'react';
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
import { createClient } from '@supabase/supabase-js';
import supabase from "../../config/supabaseClient";
import PTCard from "../../components/PTCard/PTCard";

const PTList = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isHorizontal = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    const fetchPTs = async () => {
      const { data, error } = await supabase
        .from('personal_trainers')
        .select(`
          user_id,
          introduction,
          specialization,
          price_start,
          price_end,
          users: user_id (username, full_name)
        `);

      if (error) {
        console.error('Error fetching personal trainers:', error);
      } else {
        setTrainers(data);
      }

      setLoading(false);
    };

    fetchPTs();
  }, []);

  return (
    <Box p={4}>
      <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          aria-label="Back"
      />
      <Heading mb={4}>Trainer List</Heading>

      <Box mx="108px" mt="50px" mb="100px" align="center">          
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
                          Type
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
                          Rate
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
                  {trainers.map((trainer) => (
                      <PTCard key={trainer.user_id} trainer={trainer} />
                  ))}
              </SimpleGrid>
          </Flex>  
      </Box>
    </Box>
  );
};

export default PTList;
