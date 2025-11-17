import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/App";
import HomePage from "../features/HomePage";
import ContactPage from "../features/AboutPage";
import AboutPage from "../features/ContactPage";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetailsPage from "../features/catalog/ProductDetailsPage";
import ErrorPage from "../features/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/cart/ShoppingCartPage";
import LoginPage from "../features/account/LoginPage";
import RegisterPage from "../features/account/RegisterPage";
import CheckOutPage from "../features/checkout/CheckOutPage";
import AuthGuard from "./AuthGuard";
import OrderList from "../features/orders/OrderList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "cart", element: <ShoppingCartPage /> },
      { path: "catalog/:id", element: <ProductDetailsPage /> },
      { path: "login", element: <LoginPage /> },

      //Login Zorunlu Sayfalar
      { path: "register", element: <RegisterPage /> },
      {
        element: <AuthGuard />,
        children: [
          { path: "checkout", element: <CheckOutPage /> },
          { path: "order", element: <OrderList /> },
        ],
      },

      //Hata Sayfaları
      { path: "error", element: <ErrorPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate to={"/not-found"} /> },
    ],
  },
]);
