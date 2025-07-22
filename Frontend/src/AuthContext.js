import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {};
    });

    useEffect(() => {
        // Optionally, check session expiration here
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Check session validity or handle accordingly
            setUser(parsedUser);
        }
    }, []);

    const login = (userData) => {
        console.log("This is User Data to store in lS ", userData)
        const loginTime = new Date().getTime();  // Timestamp of login
        const sessionData = { ...userData, loginTime };
        console.log("This is session Data ", sessionData)
        setUser(sessionData);
        localStorage.setItem('user', JSON.stringify(sessionData));
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser({}); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState } from 'react'

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState({});

//     const login = (userData) => {
//         setUser(userData);
//         localStorage.setItem('user', JSON.stringify(userData));
//     };

//     const logout = () => {
//         localStorage.removeItem('user');
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )

// };

// export const useAuth = () => useContext(AuthContext);
