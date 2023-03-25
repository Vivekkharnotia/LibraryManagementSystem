import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './general/firebase-config.js';

// interface User {
//     uid: string
//     email: string
// }

interface ContextType {
    user: any
}

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<ContextType>({user: null})

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
          {children}
        </UserContext.Provider>
      )
}

export const useUser = () => useContext(UserContext)