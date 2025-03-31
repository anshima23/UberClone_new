import { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentRide, setCurrentRide] = useState(null); // New state for current ride

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const updateCurrentRide = (rideData) => {
        setCurrentRide(rideData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
        currentRide, // Expose current ride
        updateCurrentRide // Method to update current ride
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
