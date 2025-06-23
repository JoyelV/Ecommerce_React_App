import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.tsx";
import Home from "../pages/Home.tsx";
import ProductDetail from "../pages/ProductDetail.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
