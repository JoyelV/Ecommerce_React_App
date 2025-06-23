// src/components/common/ProductList.tsx
import { useState, useEffect } from 'react';
import { fetchProducts, Product } from '../../services/api';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import './ProductList.css';
import { FilterState } from '../../types';

interface ProductListProps {
  filters: FilterState;
}

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (!loading) {
      let filtered = [...products];

      if (filters.brands.length > 0) {
        filtered = filtered.filter((product) =>
          filters.brands.some((brand) => product.category === brand)
        );
      }

      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );

      if (filters.ratings.length > 0) {
        filtered = filtered.filter((product) =>
          filters.ratings.some(
            (rating) => Math.round(product.rating.rate) >= rating
          )
        );
      }

      setFilteredProducts(filtered);
    }
  }, [filters, products, loading]);

  if (loading) return <p>Loading products...</p>;

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <button
                className="wishlist-icon"
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlist.has(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">
              {product.description.substring(0, 100)}...
            </p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`star ${
                    i < Math.round(product.rating.rate) ? 'filled' : ''
                  }`}
                />
              ))}
              <span className="rating-count">({product.rating.count})</span>
            </div>
          </div>
        ))
      ) : (
        <p>No products match the selected filters.</p>
      )}
    </div>
  );
};

export default ProductList;
