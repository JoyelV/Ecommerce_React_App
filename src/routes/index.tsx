import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderHistory from '../pages/OrderHistory';
import { useAuth } from '../context/AuthContext';
import Profile from '../pages/Profile';
import ProductListing from '../pages/ProductListing';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="product-list" element={<ProductListing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route
        path="order-history"
        element={
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;
