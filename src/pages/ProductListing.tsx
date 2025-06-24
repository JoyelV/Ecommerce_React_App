import { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import ProductList from '../components/common/ProductList';
import './Home.css';
import { FilterState } from '../types';

const ProductListing: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: [0, 100000],
    ratings: [],
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="home">
      <div className="home-layout">
        <div className="home-main">
          <Sidebar filters={filters} onFilterChange={handleFilterChange} />
          <div className="home-content">
            <ProductList filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;