import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import heroImage from '../../assets/herosection.png';

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Our Store</h1>
        <p className="hero-subtitle">Discover the best products at unbeatable prices.</p>
        <Link to="/product-list" className="hero-button">Shop Now</Link>
      </div>
      <div className="hero-image">
        <img
          src={heroImage}
          alt="Hero Banner"
          className="hero-banner"
        />
      </div>
    </div>
  );
};

export default HeroSection;