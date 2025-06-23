import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface User {
  id: number;
  username: string;
  email: string;
}

interface Order {
  id: number;
  userId: number;
  date: string;
  total: number;
  items: { product: Product; quantity: number }[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  placeOrder: (items: { product: Product; quantity: number }[], total: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const users: User[] = []; 
let orderIdCounter = 1;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find((u) => u.email === email && password === 'password123');
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    if (users.find((u) => u.email === email)) return false;
    const newUser: User = { id: users.length + 1, username, email };
    users.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const placeOrder = (items: { product: Product; quantity: number }[], total: number) => {
    if (user) {
      const newOrder: Order = {
        id: orderIdCounter++,
        userId: user.id,
        date: new Date().toLocaleDateString(),
        total,
        items,
      };
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      storedOrders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(storedOrders));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, placeOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};