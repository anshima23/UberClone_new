import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token'); // Ensure correct token name is used
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Remove the token from localStorage and navigate to login page
                localStorage.removeItem('captain-token');
                navigate('/captain-login');
            } catch (error) {
                console.error("Logout failed:", error);
                navigate('/captain-login'); // Optional: Handle error and redirect
            }
        };

        logout();
    }, [token, navigate]);

    return <div>Logging out...</div>;
};

export default CaptainLogout;
