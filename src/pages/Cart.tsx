import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  const calculateSubtotal = () => {
    return cart
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  if (cart.length === 0) {
    return <p>Your cart is empty. <Link to="/">Continue shopping</Link></p>;
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
              <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
              <div className="cart-item-quantity">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="subtotal">Subtotal: ${calculateSubtotal()}</p>
        <Link to="/checkout" className="checkout-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;