import React, { createContext, useState } from 'react';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        },
        location: null // Optional: Add location state if needed
    });

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserContext;
