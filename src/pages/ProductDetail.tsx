import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { fetchProduct } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

// Lazy load SimilarProducts
const SimilarProducts = lazy(() => import('../components/common/SimilarProducts'));

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProduct(Number(id));
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert('Product added to cart!');
    }
  };

  if (loading) return <div className="loader" />;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <div className="product-detail">
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`star ${i < Math.round(product.rating.rate) ? 'filled' : ''}`}
              />
            ))}
            <span className="rating-count">({product.rating.count})</span>
          </div>

          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
        </div>
      </div>

      <div className="product-description-full">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      {/* Lazy-loaded Similar Products */}
      <Suspense fallback={<div className="loader" />}>
        <SimilarProducts category={product.category} currentId={product.id} />
      </Suspense>
    </>
  );
};

export default ProductDetail;
