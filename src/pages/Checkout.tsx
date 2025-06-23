import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal + 5).toFixed(2); // Adding $5 for shipping
  };

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    clearCart(); // Simulate clearing cart after order
    setTimeout(() => setIsOrderPlaced(false), 3000); // Reset after 3 seconds
  };

  if (cart.length === 0) {
    return <p>Your cart is empty. <Link to="/">Continue shopping</Link></p>;
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {!isOrderPlaced ? (
        <>
          <div className="checkout-container">
            <div className="cart-summary">
              <h3>Order Summary</h3>
              {cart.map((item) => (
                <div key={item.product.id} className="summary-item">
                  <span>{item.product.title} x {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="summary-total">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="summary-total">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="summary-total grand-total">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            <div className="shipping-form">
              <h3>Shipping Details</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={shippingDetails.name}
                onChange={handleInputChange}
                className="shipping-input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                className="shipping-input"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className="shipping-input"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={shippingDetails.postalCode}
                onChange={handleInputChange}
                className="shipping-input"
              />
              <button
                onClick={handlePlaceOrder}
                className="place-order-button"
                disabled={!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode}
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="order-success">Order placed successfully! Redirecting to home...</p>
      )}
    </div>
  );
};

export default Checkout;