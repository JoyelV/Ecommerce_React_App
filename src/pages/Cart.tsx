import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cart
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty.</p>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.product.id} className="cart-item">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.product.title}</h3>
              <p className="cart-item-price">₹ {item.product.price.toFixed(2)}</p>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <FaPlus />
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p className="subtotal">
          Subtotal: <strong>₹ {calculateSubtotal()}</strong>
        </p>
        <Link to="/checkout" className="checkout-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
