// src/components/common/ProductList.tsx
import { useState, useEffect } from 'react';
import { fetchProducts, Product } from '../../services/api';
import './ProductList.css';

interface ProductListProps {
  filters: {
    brands: string[];
    priceRange: [number, number];
    ratings: number[];
  };
}

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

      // Filter by Brand (using category as a proxy)
      if (filters.brands.length > 0) {
        filtered = filtered.filter((product) =>
          filters.brands.some((brand) => product.category === brand)
        );
      }

      // Filter by Price Range
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );

      // Filter by Rating
      if (filters.ratings.length > 0) {
        filtered = filtered.filter((product) =>
          filters.ratings.some((rating) => Math.round(product.rating.rate) >= rating)
        );
      }

      setFilteredProducts(filtered);
    }
  }, [filters, products, loading]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No products match the selected filters.</p>
      )}
    </div>
  );
};

export default ProductList;