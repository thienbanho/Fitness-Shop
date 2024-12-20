// src/components/AdminRoute.jsx

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useToast } from "@chakra-ui/react";

const LoginRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const toast = useToast();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Get the currently authenticated user
                const { data: { user }, error: authError } = await supabase.auth.getUser();

                if (authError || !user) {
                    throw new Error("User not authenticated.");
                }

                setIsAuthenticated(true);
            } catch (error) {
                toast({
                    title: "Access Denied",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, [toast]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading indicator while checking
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default LoginRoute;
