// src/components/common/ProductList.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FilterState, Product } from '../../types';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import './ProductList.css';
import { fetchProducts } from '../../services/api';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';

interface ProductListProps {
  filters: FilterState;
}

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sortBy, setSortBy] = useState<
    'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc' | 'popularity'
  >('priceAsc');

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

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (!loading) {
      let filtered = [...products];

      // Apply filters
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

      // Apply sorting
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        if (sortBy === 'nameAsc') return a.title.localeCompare(b.title);
        if (sortBy === 'nameDesc') return b.title.localeCompare(a.title);
        if (sortBy === 'popularity') return b.rating.rate - a.rating.rate;
        return 0;
      });

      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [filters, products, loading, sortBy]);

  if (loading) {
    return (
      <div className="spinner-container">
        <FaSpinner className="spinner" />
      </div>
    );
  }

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
    <>
      {/* Top bar with Sort dropdown on right */}
      <div className="product-top-bar">
        <div className="top-bar-left">
          <BsGrid3X3GapFill className="grid-icon" />
        </div>
        <div className="sort-dropdown">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as
                  | 'priceAsc'
                  | 'priceDesc'
                  | 'nameAsc'
                  | 'nameDesc'
                  | 'popularity'
              )
            }
          >
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      <div className="product-list">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card-link"
            >
              <div className="product-item">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
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
                  {product.description.substring(0, 60)}...
                </p>
                <p className="product-price">₹ {product.price.toFixed(2)}</p>
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
            </Link>
          ))
        ) : (
          <p>No products match the selected filters.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;