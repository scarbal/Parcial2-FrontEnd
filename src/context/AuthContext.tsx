import { createContext, useContext, useState, useEffect, use } from 'react';
import { onAuthStateChanged, signInWithPopup, type User } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig'; 

interface AuthContextType {
  user: User|null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
    }
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null> (null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ? user : null);
        });
        return () => unsubscribe();
    },[]);
    const login = async () => {
        await signInWithPopup(auth, provider);
    }
    const logout = async () => {
        await auth.signOut();
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}> 
        {children}
        </AuthContext.Provider>
    );
}