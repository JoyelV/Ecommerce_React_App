import { useState } from 'react';
import Sidebar from '../components/common/Sidebar.tsx';
import ProductList from '../components/common/ProductList.tsx';
import './Home.css';

interface FilterState {
  brands: string[];
  priceRange: [number, number];
  ratings: number[];
}

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