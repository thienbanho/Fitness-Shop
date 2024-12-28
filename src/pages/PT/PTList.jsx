import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  VStack,
  useToast,
  Container,
  Heading,
  SimpleGrid,
  Avatar,
  Badge,
  Flex,
  Divider,
  useColorModeValue,
  Collapse,
  Icon,
  Textarea,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth";

export default function PTList() {
    const toast = useToast();
    const { user } = useAuth();
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeForm, setActiveForm] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        wanted_time: '',
        goal: '',
        current_condition: '',
    });

    useEffect(() => {
        if (user) {
            console.log("Current user:", user);
            const isEligible = async () => {
                const { data, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", user.email);

                if (error) {
                    console.error("Error fetching data:", error);
                    toast({
                        title: "Error",
                        description: "An error occurred while fetching user data.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    return;
                }
                setFormData(prevState => ({
                    ...prevState,
                    id: data[0].user_id || ""
                }));
            };
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
                    toast({
                        title: "Error",
                        description: "Failed to load personal trainers.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setTrainers(data);
                }

                setLoading(false);
            };
            fetchPTs();
            isEligible();
        }
    }, [user, toast]);

    const checkContractExists = async (trainerId) => {
        const { data: contractData, error: contractError } = await supabase
            .from('pt_contracts')
            .select('*')
            .eq('customer_id', formData.id)
            .eq('trainer_id', trainerId);
    
        const { data: requestData, error: requestError } = await supabase
            .from('pt_requests')
            .select('*')
            .eq('customer_id', formData.id)
            .eq('trainer_id', trainerId);
    
        if (contractError || requestError) {
            console.error('Error checking contract or request:', contractError || requestError);
            return false;
        }
    
        console.log("Contract Data:", contractData);
        console.log("Request Data:", requestData);
    
        return contractData.length > 0 || requestData.length > 0;
    };

    const handleRequestClick = async (trainerId) => {
        const contractExists = await checkContractExists(trainerId);

        if (contractExists) {
            toast({
                title: 'Contract Exists',
                description: 'You already have a contract/request with this trainer.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else {
            setActiveForm(trainerId);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitRequest = async (e, trainerId) => {
        e.preventDefault();
        console.log("Submitting request:", formData);

        const { error } = await supabase
            .from('pt_requests')
            .insert({
                customer_id: formData.id,
                trainer_id: trainerId,
                wanted_time: formData.wanted_time,
                goal: formData.goal,
                current_condition: formData.current_condition
            });

        if (error) {
            console.error('Error submitting request:', error);
            toast({
                title: 'Error',
                description: 'There was an error submitting your request.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Request Submitted',
                description: 'Your request has been successfully submitted.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setActiveForm(null);
        }
    };

    const bgColor = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <Container maxW="container.xl" py={8}>
            <Heading as="h1" size="2xl" mb={8} textAlign="center">
                Personal Trainers
            </Heading>
            {loading ? (
                <Flex justify="center" align="center" minH="50vh">
                    <Spinner size="xl" />
                </Flex>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {trainers.map((trainer) => (
                        <Box
                            key={trainer.user_id}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="lg"
                            bg={bgColor}
                            borderColor={borderColor}
                        >
                            <Box p={6}>
                                <Flex align="center" mb={4}>
                                    <Avatar size="xl" name={trainer.users.full_name} mr={4} />
                                    <Box>
                                        <Heading as="h3" size="lg">
                                            {trainer.users.full_name}
                                        </Heading>
                                        <Text color="gray.500" fontSize="md">@{trainer.users.username}</Text>
                                    </Box>
                                </Flex>
                                <Text fontSize="md" mb={4}>
                                    {trainer.introduction}
                                </Text>
                                <Divider my={4} />
                                <SimpleGrid columns={2} spacing={4} mb={4}>
                                    <Box>
                                        <Text fontWeight="bold">Specialization</Text>
                                        <Badge colorScheme="teal" fontSize="md">{trainer.specialization}</Badge>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold">Price Range</Text>
                                        <Text fontSize="md">${trainer.price_start} - ${trainer.price_end}</Text>
                                    </Box>
                                </SimpleGrid>
                                <Button
                                    colorScheme="blue"
                                    width="full"
                                    onClick={() => handleRequestClick(trainer.user_id)}
                                >
                                    Request Training
                                </Button>
                            </Box>
                            <Collapse in={activeForm === trainer.user_id} animateOpacity>
                                <Box p={6} borderTopWidth="1px" borderColor={borderColor}>
                                    <Heading as="h4" size="md" mb={4}>
                                        Submit Your Request
                                    </Heading>
                                    <form onSubmit={(e) => handleSubmitRequest(e, trainer.user_id)}>
                                        <VStack spacing={4}>
                                            <FormControl isRequired>
                                                <FormLabel>Preferred Time</FormLabel>
                                                <Input
                                                    type="text"
                                                    name="wanted_time"
                                                    value={formData.wanted_time}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Weekdays after 6PM"
                                                />
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Your Goal</FormLabel>
                                                <Textarea
                                                    name="goal"
                                                    value={formData.goal}
                                                    onChange={handleInputChange}
                                                    placeholder="Describe your fitness goals"
                                                    rows={3}
                                                />
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Current Condition</FormLabel>
                                                <Textarea
                                                    name="current_condition"
                                                    value={formData.current_condition}
                                                    onChange={handleInputChange}
                                                    placeholder="Describe your current fitness level and any health conditions"
                                                    rows={3}
                                                />
                                            </FormControl>
                                            <Button type="submit" colorScheme="blue" width="full">
                                                Submit Request
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                width="full"
                                                onClick={() => setActiveForm(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </VStack>
                                    </form>
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
}

