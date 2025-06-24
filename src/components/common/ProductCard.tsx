import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import './ProductCard.css';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: { rate: number; count: number };
  };
  isInWishlist: boolean;
  onWishlistToggle: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isInWishlist, onWishlistToggle }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-item">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
          <button
            className="wishlist-icon"
            onClick={(e) => {
              e.preventDefault();
              onWishlistToggle(product.id);
            }}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description.substring(0, 60)}...</p>
        <p className="product-price">₹ {product.price.toFixed(2)}</p>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`star ${i < Math.round(product.rating.rate) ? 'filled' : ''}`}
            />
          ))}
          <span className="rating-count">({product.rating.count})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;