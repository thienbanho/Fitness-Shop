
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useToast } from "@chakra-ui/react";

const VendorRoute = () => {
    const [isVendor, setIsVendor] = useState(null);
    const toast = useToast();

    useEffect(() => {
        const checkVendorRole = async () => {
            try {
                // Get the currently authenticated user
                const { data: { user }, error: authError } = await supabase.auth.getUser();

                if (authError || !user) {
                    throw new Error("User not authenticated.");
                }

                // Fetch the user's role from the 'users' table
                const { data, error } = await supabase
                    .from("users")
                    .select("role")
                    .eq("email", user.email)
                    .single();

                if (error || !data) {
                    throw new Error("Error fetching user role.");
                }

                setIsVendor(data.role === "vendor");
            } catch (error) {
                toast({
                    title: "Access Denied",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                setIsVendor(false);
            }
        };

        checkVendorRole();
    }, [toast]);

    if (isVendor === null) {
        return <div>Loading...</div>; // Show a loading indicator while checking
    }

    return isVendor ? <Outlet /> : <Navigate to="/" replace />;
};

export default VendorRoute;
