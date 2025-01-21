import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Add the Authorization header and withCredentials option to the request
  axios
    .get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is included here
      },
      withCredentials: true, // Ensure cookies are sent along with the request
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    })
    .catch((err) => {
      console.error("Logout failed", err);
      navigate('/login');
    });

  return <div>Logging out...</div>;
};

export default UserLogout;
