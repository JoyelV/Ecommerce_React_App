export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json();
};
