import { useState } from 'react';
import './Sidebar.css';
import { FaStar } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Nike');
  const [priceRange, setPriceRange] = useState<[number, number]>([29000, 29000]);
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const brands = ['Nike', 'Adidas', 'Apple', 'Puma'];
  const ratings = [5, 4, 3, 2];

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    if (newRange[1] - newRange[0] >= 500) {
      setPriceRange(newRange);
    }
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
            <input type="text" placeholder="Search brand..." className="search-input" />
            <ul className="brand-list">
              {brands.map((brand) => (
                <li
                  key={brand}
                  className={`brand-item ${selectedBrand === brand ? 'selected' : ''}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  <span>{brand} <small>123</small></span>
                  {selectedBrand === brand && <span className="checkmark">✔</span>}
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
          <div className="card-content price-section">
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
                onChange={(e) =>
                  handlePriceChange(0, Math.min(Number(e.target.value), priceRange[1] - 500))
                }
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChange(1, Math.max(Number(e.target.value), priceRange[0] + 500))
                }
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
              <div className="rating-row" key={star}>
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
