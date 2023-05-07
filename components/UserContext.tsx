import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './general/firebase-config.js';

// interface User {
//     uid: string
//     email: string
// }

interface ContextType {
    user: any,
    userLoading: boolean,
    loggedIn: boolean,
    setLoggedIn: any
}

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<ContextType>({user: null, userLoading: false, loggedIn: false, setLoggedIn: null})

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<any>(null)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [userLoading, setUserLoading] = useState<boolean>(false)

    useEffect(() => {
            onAuthStateChanged(auth, (currentUser) => {
                setUserLoading(true);
                setUser(currentUser);
                if(currentUser) setUserLoading(false);   
            })
    }, [])

    return (
        <UserContext.Provider value={{ user, userLoading, loggedIn, setLoggedIn }}>
          {children}
        </UserContext.Provider>
      
        
      )
}

export const useUser = () => useContext(UserContext)