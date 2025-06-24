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
  status?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  placeOrder: (items: { product: Product; quantity: number }[], total: number) => void;
  processPayment: (orderId: number, paymentDetails: { cardNumber: string; expiry: string; cvv: string }) => Promise<{ success: boolean; message: string }>;
  getLatestOrder: () => Order | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let orderIdCounter = 1;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      if (!response.ok) {
        const text = await response.text(); 
        console.error('Login response:', text);
        return { success: false, message: `Login failed with status ${response.status}. Check credentials or API status.` };
      }
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error('Registration response:', text);
        return { success: false, message: `Registration failed with status ${response.status}. API may not support direct registration.` };
      }
      const data = await response.json();
      if (data.id) {
        setUser({ id: data.id, username, email });
        return { success: true, message: 'Registration successful! Please log in.' };
      }
      return { success: false, message: 'Registration failed. Please try again.' };
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
        status: 'Pending',
      };
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      storedOrders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(storedOrders));
    }
  };

  const processPayment = async (orderId: number, paymentDetails: { cardNumber: string; expiry: string; cvv: string }): Promise<{ success: boolean; message: string }> => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const order = storedOrders.find((o: Order) => o.id === orderId);
      if (!order || order.userId !== user?.id) {
        return { success: false, message: 'Order not found or unauthorized' };
      }

      if (!/^\d{16}$/.test(paymentDetails.cardNumber) || !/^\d{4}$/.test(paymentDetails.cvv) || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)) {
        return { success: false, message: 'Invalid payment details' };
      }

      order.status = 'Completed';
      localStorage.setItem('orders', JSON.stringify(storedOrders));
      return { success: true, message: 'Payment successful!' };
    } catch (error) {
      console.error('Payment failed:', error);
      return { success: false, message: 'Payment processing failed' };
    }
  };

  const getLatestOrder = (): Order | null => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    return storedOrders.length > 0 ? storedOrders[storedOrders.length - 1] : null;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, placeOrder, processPayment, getLatestOrder }}>
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