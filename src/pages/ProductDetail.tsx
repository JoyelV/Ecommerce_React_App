import { useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <h2>Product Detail Page (ID: {id})</h2>;
};

export default ProductDetail;
