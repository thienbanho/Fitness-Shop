import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth";

export default function PTRequestManagement() {
    const toast = useToast();
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [public_user_id, setPublicUserId] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchUser = async () => {
                const { data, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", user.email);

                if (error) {
                    console.error("Error fetching data:", error);
                    alert("An error occurred while fetching user data.");
                    return;
                }
                console.log("data:", data[0].user_id);
                setPublicUserId(data[0].user_id);
            };

            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        if (public_user_id) {
            const fetchRequests = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from('pt_requests')
                    .select(`
                        *,
                        customer:users!pt_requests_customer_id_fkey (user_id, username, full_name)
                    `)
                    .eq('trainer_id', public_user_id);

                if (error) {
                    console.error('Error fetching requests:', error);
                    toast({
                        title: 'Error',
                        description: 'Unable to fetch requests.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setRequests(data);
                }

                setLoading(false);
            };

            fetchRequests();
        }
    }, [public_user_id, toast]);

    const handleAccept = async (request) => {
        try {
            // Insert data into pt_contracts
            const { error: insertError } = await supabase.from('pt_contracts').insert({
                trainer_id: public_user_id,
                customer_id: request.customer_id,
                end: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(), //sau 30 ngày
                goal: request.goal,
                // current_condition: request.current_condition,
                time: request.wanted_time,
            });

            if (insertError) {
                throw insertError;
            }

            // Delete the request
            const { error: deleteError } = await supabase
                .from('pt_requests')
                .delete()
                .eq('request_id', request.request_id);

            if (deleteError) {
                throw deleteError;
            }

            toast({
                title: 'Request Accepted',
                description: 'The request has been successfully accepted.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Update the UI
            setRequests(requests.filter((r) => r.request_id !== request.request_id));
        } catch (error) {
            console.error('Error handling accept:', error);
            toast({
                title: 'Error',
                description: 'Failed to accept the request.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleReject = async (requestId) => {
        try {
            const { error } = await supabase
                .from('pt_requests')
                .delete()
                .eq('request_id', requestId);

            if (error) {
                throw error;
            }

            toast({
                title: 'Request Rejected',
                description: 'The request has been successfully rejected.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Update the UI
            setRequests(requests.filter((r) => r.request_id !== requestId));
        } catch (error) {
            console.error('Error handling reject:', error);
            toast({
                title: 'Error',
                description: 'Failed to reject the request.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4}>
            <Text fontSize="2xl" mb={4}>Your Requests</Text>
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <List spacing={4}>
                    {requests.length === 0 ? (
                        <Text>No requests found.</Text>
                    ) : (
                        requests.map((request) => (
                            <ListItem key={request.request_id} p={4} borderWidth="1px" borderRadius="md">
                                <Text><strong>Customer:</strong> {request.customer.full_name} ({request.customer.username})</Text>
                                <Text><strong>Wanted Time:</strong> {request.wanted_time}</Text>
                                <Text><strong>Goal:</strong> {request.goal}</Text>
                                <Text><strong>Current Condition:</strong> {request.current_condition}</Text>
                                <VStack mt={4} spacing={2}>
                                    <Button colorScheme="green" onClick={() => handleAccept(request)}>
                                        Accept
                                    </Button>
                                    <Button colorScheme="red" onClick={() => handleReject(request.request_id)}>
                                        Reject
                                    </Button>
                                </VStack>
                            </ListItem>
                        ))
                    )}
                </List>
            )}
        </Box>
    );
}
