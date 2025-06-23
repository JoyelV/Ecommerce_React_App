import { useState, useEffect } from 'react';
import './Sidebar.css';
import { FaStar } from 'react-icons/fa';
import { fetchProducts } from '../../services/api';
import { FilterState } from '../../types';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    rating: true,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange
  );
  const [brands, setBrands] = useState<string[]>([]);
  const ratings = [5, 4, 3, 2];

  useEffect(() => {
    const getBrands = async () => {
      const products = await fetchProducts();
      const uniqueBrands = [
        ...new Set(products.map((product) => product.category)),
      ];
      setBrands(uniqueBrands);
    };
    getBrands();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
    setPriceRange(filters.priceRange);
  }, [filters]);

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = localFilters.brands.includes(brand)
      ? localFilters.brands.filter((b) => b !== brand)
      : [...localFilters.brands, brand];
    const newFilters = { ...localFilters, brands: updatedBrands };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange = [...priceRange] as [number, number];
    if (index === 0) {
      newRange[0] = Math.min(value, newRange[1] - 500);
    } else {
      newRange[1] = Math.max(value, newRange[0] + 500);
    }
    setPriceRange(newRange);
    const newFilters = { ...localFilters, priceRange: newRange };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const updatedRatings = localFilters.ratings.includes(rating)
      ? localFilters.ratings.filter((r) => r !== rating)
      : [...localFilters.ratings, rating];
    const newFilters = { ...localFilters, ratings: updatedRatings };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <aside className="sidebar-ui">
      <div className="sidebar-header">
        <span>Filter</span>
        <span className="advanced">Advanced</span>
      </div>

      {/* Category */}
      <div className="sidebar-card">
        <div className="card-header" onClick={() => toggleSection('category')}>
          <span>Category</span>
          <span className="arrow">▾</span>
        </div>
        {expanded.category && (
          <div className="card-content">
            <input
              type="text"
              placeholder="Search brand..."
              className="search-input"
            />
            <ul className="brand-list">
              {brands.map((brand) => (
                <li
                  key={brand}
                  className={`brand-item ${
                    localFilters.brands.includes(brand) ? 'selected' : ''
                  }`}
                  onClick={() => handleBrandChange(brand)}
                >
                  <span>
                    {brand} <small>123</small>
                  </span>
                  {localFilters.brands.includes(brand) && (
                    <span className="checkmark">✔</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="sidebar-card">
        <div className="card-header" onClick={() => toggleSection('price')}>
          <span>Price</span>
          <span className="arrow">▾</span>
        </div>
        {expanded.price && (
          <div className="card-content">
            <div className="histogram">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="bar"
                  style={{ height: `${10 + Math.random() * 40}px` }}
                ></div>
              ))}
            </div>
            <div className="range-slider">
              <div className="slider-track"></div>
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              />
            </div>
            <div className="price-values">
              <button>{priceRange[0].toLocaleString()} INR</button>
              <button>{priceRange[1].toLocaleString()} INR</button>
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="sidebar-card">
        <div className="card-header" onClick={() => toggleSection('rating')}>
          <span>Rating</span>
          <span className="arrow">▾</span>
        </div>
        {expanded.rating && (
          <div className="card-content rating-section">
            {ratings.map((star) => (
              <div
                className="rating-row"
                key={star}
                onClick={() => handleRatingChange(star)}
              >
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`star ${i < star ? 'filled' : ''}`}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
