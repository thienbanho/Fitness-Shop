import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, List, ListItem, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth"; // Import useAuth hook

export default function PTList() {
    const toast = useToast();
    const { user } = useAuth();
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeForm, setActiveForm] = useState(null);
    const [formData, setFormData] = useState({
        id: 'asd',
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
                    alert("An error occurred while fetching user data.");
                    return;
                }
                setFormData({
                    id: data[0].user_id || ""
                })
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
    
        // Nếu có hợp đồng hoặc yêu cầu, trả về true
        return contractData.length > 0 || requestData.length > 0; // Nếu đã có hợp đồng hoặc yêu cầu thì trả về true
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

    return (
        <Box p={4}>
            <Text fontSize="2xl" mb={4}>Personal Trainers List</Text>
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <List spacing={4}>
                    {trainers.map((trainer) => (
                        <ListItem key={trainer.user_id} p={4} borderWidth="1px" borderRadius="md">
                            <Text><strong>Username:</strong> {trainer.users.username}</Text>
                            <Text><strong>Full Name:</strong> {trainer.users.full_name}</Text>
                            <Text><strong>Introduction:</strong> {trainer.introduction}</Text>
                            <Text><strong>Specialization:</strong> {trainer.specialization}</Text>
                            <Text><strong>Price Range:</strong> ${trainer.price_start} - ${trainer.price_end}</Text>
                            <Button mt={2} colorScheme="teal" onClick={() => handleRequestClick(trainer.user_id)}>
                                Request
                            </Button>
                            {activeForm === trainer.user_id && (
                                <Box mt={4} p={4} borderWidth="1px" borderRadius="md" shadow="md">
                                    <Text fontSize="lg" mb={4}>Submit Your Request</Text>
                                    <form onSubmit={(e) => handleSubmitRequest(e, trainer.user_id)}>
                                        <VStack spacing={4}>
                                            <FormControl isRequired>
                                                <FormLabel>Wanted Time</FormLabel>
                                                <Input
                                                    type="text"
                                                    name="wanted_time"
                                                    value={formData.wanted_time}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Goal</FormLabel>
                                                <Input
                                                    type="text"
                                                    name="goal"
                                                    value={formData.goal}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Current Condition</FormLabel>
                                                <Input
                                                    type="text"
                                                    name="current_condition"
                                                    value={formData.current_condition}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                            <Button type="submit" colorScheme="teal" width="full">
                                                Submit
                                            </Button>
                                            <Button
                                                type="button"
                                                colorScheme="red"
                                                width="full"
                                                onClick={() => setActiveForm(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </VStack>
                                    </form>
                                </Box>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

