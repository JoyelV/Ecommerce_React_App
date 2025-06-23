import { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import ProductList from '../components/common/ProductList';
import './Home.css';
import { FilterState } from '../types';

const Home: React.FC = () => {
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
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      <div className="home-content">
        <h2>Product Listing Page</h2>
        <ProductList filters={filters} />
      </div>
    </div>
  );
};

export default Home;
