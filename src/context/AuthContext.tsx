import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Pet } from '../types';
import { users, pets } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  currentPet: Pet | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate against a backend
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      // Get the first pet associated with this user
      const userPet = pets.find(p => p.ownerId === user.id);
      if (userPet) {
        setCurrentPet(userPet);
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would create a new user in the backend
    // For now, we'll just simulate success
    setCurrentUser({
      id: `user${users.length + 1}`,
      name,
      email,
    });
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPet(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, currentPet, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};