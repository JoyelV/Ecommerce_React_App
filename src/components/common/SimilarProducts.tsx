import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { fetchProductsByCategory } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

interface Props {
  category: string;
  currentId: number;
}

const SimilarProducts: React.FC<Props> = ({ category, currentId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProductsByCategory(category);
        const filtered = data.filter((p) => p.id !== currentId).slice(0, 4);
        setProducts(filtered);
      } catch (e) {
        console.error('Error loading similar products:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, currentId]);

  if (loading) return null;
  if (!products.length) return <p>No similar products found.</p>;

  return (
    <div className="similar-products">
      <h3>Similar Products</h3>
      <div className="similar-products-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="similar-product-card"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={product.image} alt={product.title} loading="lazy" />
            <p className="similar-title">{product.title.slice(0, 40)}...</p>
            <p className="similar-price">${product.price.toFixed(2)}</p>
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
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
