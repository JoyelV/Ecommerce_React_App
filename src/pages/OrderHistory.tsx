import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import './OrderHistory.css';

interface Order {
  id: number;
  userId: number;
  date: string;
  total: number;
  items: { product: Product; quantity: number }[];
}

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const storedOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = storedOrders.filter((order) => order.userId === user.id);
    setOrders(userOrders);
  }, [user]);

  if (!user) {
    return <p>Please <Link to="/login">log in</Link> to view your order history.</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found. <Link to="/">Start shopping</Link></p>;
  }

  return (
    <div className="order-history-page">
      <h2>Order History</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <h3>Order #{order.id}</h3>
            <p>Date: {order.date}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <ul className="order-items">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.product.title} x {item.quantity} - ${(item.product.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
};

export default OrderHistory;