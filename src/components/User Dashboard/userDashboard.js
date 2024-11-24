import React, { useState, useEffect } from "react";
import './userDashboard.css';
import profileAvt from '../../assets/profile-user.png';
import supabase from "../../config/supabaseClient";

const UserDashboard = () => {
    const [userData, setUserData] = useState({
        displayName: '',
        email: '',
    });

    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [session, setSession] = useState(null); // Track session state

    // Fetch user session when component mounts
    useEffect(() => {
        const getSession = async () => {
            // Use getSession() to fetch the current session
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (session) {
                const { user } = session;
                setUserData({
                    displayName: user?.user_metadata?.full_name || 'Unknown',
                    email: user?.email || 'Unknown'
                });
            }
            setIsLoading(false);
        };

        getSession();
        
        // Subscribe to session changes (e.g., when a user logs in or out)
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                const { user } = session;
                setUserData({
                    displayName: user?.user_metadata?.full_name || 'Unknown',
                    email: user?.email || 'Unknown'
                });
            } else {
                setUserData({ displayName: '', email: '' });
            }
        });
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUserData({ displayName: '', email: '' });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Please log in to view your dashboard.</div>;
    }

    return (
        <div className="profile-sidebar">
            <div className="mail-zone">
                <img className="mail-avt" src={profileAvt} alt="Avatar" />
                <div className="mail">{userData.displayName || 'Loading...'}</div>
                <div className="mail">{userData.email || 'Loading...'}</div>
            </div>
            <div className="menu-list">
                <a href="#">Account information</a>
                <br />
                <a href="#">List of orders</a>
                <br />
                <a href="#">PT registration</a>
                <br />
                <a href="#">Coupon wallet</a>
                <br />
                <a href="#" onClick={handleSignOut}>Sign out</a>
                <br />
            </div>
        </div>
    );
};

export default UserDashboard;
