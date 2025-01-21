import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                if (response.status === 200) {
                    // Remove the token from localStorage and navigate to login page
                    localStorage.removeItem('captain-token')
                    navigate('/captain-login')
                }
            } catch (error) {
                console.error("Logout failed:", error)
                // Optional: Handle error, maybe show a message to the user
                navigate('/captain-login')
            }
        }

        logout()
    }, [token, navigate])

    return <div>Logging out...</div>
}

export default CaptainLogout
