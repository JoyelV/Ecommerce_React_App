import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
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

  React.useEffect(() => {
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
            <img src="/logo.svg" alt="Logo" className="navbar-logo-icon" />
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
                setIsMoreOpen(false); // Close other dropdown
              }}
            >
              Zoffi ▼
            </button>
            {isZoffiOpen && (
              <ul className="navbar-dropdown-menu">
                <li>
                  <NavLink to="/category/men" onClick={() => setIsZoffiOpen(false)}>Men</NavLink>
                </li>
                <li>
                  <NavLink to="/category/women" onClick={() => setIsZoffiOpen(false)}>Women</NavLink>
                </li>
                <li>
                  <NavLink to="/category/electronics" onClick={() => setIsZoffiOpen(false)}>Electronics</NavLink>
                </li>
              </ul>
            )}
          </div>

          <NavLink to="/seller" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
            Become a Seller
          </NavLink>

          <div className="navbar-dropdown">
            <button
              type="button"
              className="navbar-dropdown-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setIsMoreOpen(!isMoreOpen);
                setIsZoffiOpen(false); // Close other dropdown
              }}
            >
              More ▼
            </button>
            {isMoreOpen && (
              <ul className="navbar-dropdown-menu">
                <li>
                  <NavLink to="/about" onClick={() => setIsMoreOpen(false)}>About</NavLink>
                </li>
                <li>
                  <NavLink to="/contact" onClick={() => setIsMoreOpen(false)}>Contact</NavLink>
                </li>
              </ul>
            )}
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                <span className="navbar-user">{user.username}</span>
                <button className="navbar-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </NavLink>
            )}
          </div>

          <Link to="/cart" className="cart-link" onClick={() => setIsMobileMenuOpen(false)}>
            <FaShoppingCart />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;