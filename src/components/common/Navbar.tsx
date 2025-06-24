import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
} from 'react-icons/fa';
import './Navbar.css';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isZoffiOpen, setIsZoffiOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsZoffiOpen(false);
      setIsMoreOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo + Search */}
        <div className="navbar-left">
          <NavLink to="/" className="navbar-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="512" cy="512" r="512" fill="#1A73E8" />
              <path
                d="M512 256A256 256 0 1 1 256 512H384A128 128 0 1 0 512 384V256Z"
                fill="#fff"
              />
            </svg>
            <span className="navbar-logo-text">Logo Here</span>
          </NavLink>

          <div className="navbar-search">
            <FaSearch className="navbar-search-icon" />
            <input
              type="text"
              placeholder="Search Here..."
              className="navbar-search-input"
            />
          </div>
        </div>

        {/* Hamburger Icon */}
        <div
          className="navbar-mobile-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Right Menu */}
        <div className={`navbar-right ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-dropdown">
            <button
              type="button"
              className="navbar-dropdown-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoffiOpen(!isZoffiOpen);
                setIsMoreOpen(false);
              }}
            >
              Zoffi ▼
            </button>
            {isZoffiOpen && (
              <ul className="navbar-dropdown-menu">
                <li>
                  <NavLink
                    to="/category/men"
                    onClick={() => setIsZoffiOpen(false)}
                  >
                    Men
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/category/women"
                    onClick={() => setIsZoffiOpen(false)}
                  >
                    Women
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/category/electronics"
                    onClick={() => setIsZoffiOpen(false)}
                  >
                    Electronics
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <NavLink
            to="/seller"
            className="navbar-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Become a Seller
          </NavLink>

          <div className="navbar-dropdown">
            <button
              type="button"
              className="navbar-dropdown-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setIsMoreOpen(!isMoreOpen);
                setIsZoffiOpen(false);
              }}
            >
              More ▼
            </button>
            {isMoreOpen && (
              <ul className="navbar-dropdown-menu">
                <li>
                  <NavLink to="/about" onClick={() => setIsMoreOpen(false)}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" onClick={() => setIsMoreOpen(false)}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className="navbar-user"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {user.username}
                </NavLink>
                <button className="navbar-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="navbar-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>

          <Link
            to="/cart"
            className="cart-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaShoppingCart />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;