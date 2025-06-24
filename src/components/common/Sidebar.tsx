import { useState, useEffect } from 'react';
import './Sidebar.css';
import { fetchProducts } from '../../services/api';
import { FilterState } from '../../types';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange
  );
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    '#000000',
    '#FF5A5F',
    '#FFB400',
    '#00D084',
    '#8ED1FC',
    '#B10DC9',
    '#7FDBFF',
    '#39CCCC',
  ];

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
    newRange[index] = value;
    setPriceRange(newRange);
    const newFilters = { ...localFilters, priceRange: newRange };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <aside className="sidebar-ui">
      <div className="sidebar-header">
        <span>Filter</span>
        <span className="advanced">Advanced</span>
      </div>

      {/* Brand */}
      <div className="sidebar-card">
        <div className="card-header">Brand</div>
        <div className="card-content brand-section">
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
                {brand} <span className="count">123</span>
                {localFilters.brands.includes(brand) && (
                  <span className="tick">✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price Histogram */}
      <div className="sidebar-card">
        <div className="card-header">Price</div>
        <div className="card-content">
          <div className="histogram">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="bar"
                style={{ height: `${20 + Math.random() * 40}px` }}
              ></div>
            ))}
          </div>
          <div className="range-slider">
            <input
              type="range"
              min="0"
              max="100000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="slider-input"
            />
          </div>
          <div className="price-values">
            <button>{priceRange[0].toLocaleString()} INR</button>
            <button>{priceRange[1].toLocaleString()} INR</button>
          </div>
        </div>
      </div>

      {/* Size Options */}
      <div className="sidebar-card">
        <div className="card-header">Price</div>
        <div className="card-content size-container">
          {sizes.map((size) => (
            <button key={size} className="size-btn">
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Options */}
      <div className="sidebar-card">
        <div className="card-header">Color</div>
        <div className="card-content color-section-row">
          {colors.map((color, i) => (
            <div
              key={i}
              className="color-circle"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
