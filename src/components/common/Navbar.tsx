import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isZoffiOpen, setIsZoffiOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              onClick={() => setIsZoffiOpen(!isZoffiOpen)}
            >
              Zoffi ▼
            </button>
            {isZoffiOpen && (
              <ul className="navbar-dropdown-menu">
                <li>
                  <NavLink to="/category/men">Men</NavLink>
                </li>
                <li>
                  <NavLink to="/category/women">Women</NavLink>
                </li>
                <li>
                  <NavLink to="/category/electronics">Electronics</NavLink>
                </li>
              </ul>
            )}
          </div>

          <NavLink to="/seller" className="navbar-link">
            Become a Seller
          </NavLink>

          <div className="navbar-dropdown">
            <button
              type="button"
              className="navbar-dropdown-toggle"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              More ▼
            </button>
            {isMoreOpen && (
              <ul className="navbar-dropdown-menu">
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            )}
          </div>

          <NavLink to="/cart" className="navbar-link cart-link">
            Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
