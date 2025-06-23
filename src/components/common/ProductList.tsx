import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FilterState, Product } from '../../types';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import './ProductList.css';
import { fetchProducts } from '../../services/api';

interface ProductListProps {
  filters: FilterState;
}

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'priceAsc' | 'priceDesc' | 'name'>('priceAsc');

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

      // Apply search
      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply filters
      if (filters.brands.length > 0) {
        filtered = filtered.filter((product) =>
          filters.brands.some((brand) => product.category === brand)
        );
      }

      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );

      if (filters.ratings.length > 0) {
        filtered = filtered.filter((product) =>
          filters.ratings.some((rating) => Math.round(product.rating.rate) >= rating)
        );
      }

      // Apply sorting
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        return a.title.localeCompare(b.title);
      });

      setFilteredProducts(filtered);
    }
  }, [filters, products, loading, searchTerm, sortBy]);

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
      <div className="product-list-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="product-search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'priceAsc' | 'priceDesc' | 'name')}
          className="product-sort-select"
        >
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
            <div className="product-item">
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
                <button
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                  }}
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
                    className={`star ${i < Math.round(product.rating.rate) ? 'filled' : ''}`}
                  />
                ))}
                <span className="rating-count">({product.rating.count})</span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No products match the selected filters or search.</p>
      )}
    </div>
  );
};

export default ProductList;