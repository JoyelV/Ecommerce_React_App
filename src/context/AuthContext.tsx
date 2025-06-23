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
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  placeOrder: (items: { product: Product; quantity: number }[], total: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let orderIdCounter = 1;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser({ id: 1, username: email.split('@')[0], email }); 
        return { success: true, message: 'Logged in successfully!' };
      }
      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: 'Login failed due to a network error' };
    }
  };

  const register = async (username: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({ id: data.id, username, email });
        return { success: true, message: 'Registration successful! Please log in.' };
      }
      return { success: false, message: 'Registration failed. Email may be in use.' };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, message: 'Registration failed due to a network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
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