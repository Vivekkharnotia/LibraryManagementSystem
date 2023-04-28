import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './general/firebase-config.js';

// interface User {
//     uid: string
//     email: string
// }

interface ContextType {
    user: any,
    loading: boolean,
    loggedIn: boolean,
    setLoggedIn: any
}

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<ContextType>({user: null, loading: false, loggedIn: false, setLoggedIn: null})

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<any>(null)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setLoading(true);
            console.log('Loading set to true');
            setUser(currentUser);
            console.log('Loading set to false');

            setLoading(false);
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, loading, loggedIn, setLoggedIn }}>
          {children}
        </UserContext.Provider>
      
        
      )
}

export const useUser = () => useContext(UserContext)