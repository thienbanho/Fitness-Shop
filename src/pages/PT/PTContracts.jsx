import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../hooks/Auth";

export default function PTContracts() {
    const toast = useToast();
    const { user } = useAuth();
    const [contracts, setContracts] = useState([]);
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
                    console.error("Error fetching user data:", error);
                    alert("An error occurred while fetching user data.");
                    return;
                }
                setPublicUserId(data[0].user_id);
            };

            fetchUser();
        }
    }, [user]);
    useEffect(() => {

        if (public_user_id) {
            const fetchContracts = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from('pt_contracts')
                    .select(`*, customer:users!pt_contracts_customer_id_fkey (user_id, username, full_name)`)
                    .eq('trainer_id', public_user_id);

                if (error) {
                    console.error('Error fetching contracts:', error);
                    toast({
                        title: 'Error',
                        description: 'Unable to fetch contracts.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setContracts(data);
                }

                setLoading(false);
            };

            fetchContracts();
        }
    }, [public_user_id, toast]);

    return (
        <Box p={4}>
            <Text fontSize="2xl" mb={4}>Your Contracts</Text>
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <List spacing={4}>
                    {contracts.length === 0 ? (
                        <Text>No contracts found.</Text>
                    ) : (
                        contracts.map((contract) => (
                            <ListItem key={contract.contract_id} p={4} borderWidth="1px" borderRadius="md">
                                <Text><strong>Customer:</strong> {contract.customer.full_name} ({contract.customer.username})</Text>
                                <Text><strong>End Date:</strong> {new Date(contract.end).toLocaleDateString()}</Text>
                                <Text><strong>Goal:</strong> {contract.goal}</Text>
                                <Text><strong>Time:</strong> {contract.time}</Text>
                                <VStack mt={4} spacing={2}>
                                    {/* Bạn có thể thêm nút để thao tác với hợp đồng nếu cần */}
                                </VStack>
                            </ListItem>
                        ))
                    )}
                </List>
            )}
        </Box>
    );
}
