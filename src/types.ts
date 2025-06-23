export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  ratings: number[];
}