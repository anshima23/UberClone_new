import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is included here
          },
          withCredentials: true, // Ensure cookies are sent along with the request
        });

        // Remove the token from localStorage and navigate to login page
        localStorage.removeItem('token');
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
        navigate('/login'); // Optional: Handle error and redirect
      }
    };

    logout();
  }, [token, navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
