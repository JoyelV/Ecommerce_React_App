import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user, placeOrder, processPayment, getLatestOrder } = useAuth();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'payment') => {
    const { name, value } = e.target;
    if (type === 'shipping') {
      setShippingDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal + 5).toFixed(2); // Adding $5 for shipping
  };

  const handlePlaceOrder = async () => {
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode) {
      setError('Please fill all shipping details');
      return;
    }

    const total = parseFloat(calculateTotal());
    placeOrder(cart.map(item => ({ product: item.product, quantity: item.quantity })), total);

    const latestOrder = getLatestOrder();
    if (latestOrder) {
      const paymentResult = await processPayment(latestOrder.id, paymentDetails);
      if (paymentResult.success) {
        setMessage('Order placed successfully!');
        setIsOrderPlaced(true);
        clearCart();
        setTimeout(() => {
          navigate('/order-history'); 
        }, 3000); 
      } else {
        setError(paymentResult.message);
      }
    } else {
      setError('Failed to retrieve the latest order');
    }
  };

  if (cart.length === 0) {
    return <p>Your cart is empty. <Link to="/">Continue shopping</Link></p>;
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {!isOrderPlaced ? (
        <>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
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
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="shipping-input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingDetails.address}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="shipping-input"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingDetails.city}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="shipping-input"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={shippingDetails.postalCode}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="shipping-input"
              />
              <h3>Payment Details</h3>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number (16 digits)"
                value={paymentDetails.cardNumber}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="shipping-input"
              />
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={paymentDetails.expiry}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="shipping-input"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV (4 digits)"
                value={paymentDetails.cvv}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="shipping-input"
              />
              <button
                onClick={handlePlaceOrder}
                className="place-order-button"
                disabled={!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode || !paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv}
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="order-success">Order placed successfully! Redirecting to Order History...</p>
      )}
    </div>
  );
};

export default Checkout;