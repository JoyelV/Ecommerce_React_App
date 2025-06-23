import { Routes, Route, Outlet } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  </Routes>
);

export default AppRoutes;