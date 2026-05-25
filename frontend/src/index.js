import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";

// Marketing Landing Pages
import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";
import Login from "./landing_page/login/Login";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import NotFound from "./landing_page/NotFound";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";

// TradeDash secure dashboard components
import Home from "./dashboard_components/Home";
import Summary from "./dashboard_components/Summary";
import Orders from "./dashboard_components/Orders";
import Holdings from "./dashboard_components/Holdings";
import Positions from "./dashboard_components/Positions";
import Funds from "./dashboard_components/Funds";
import Apps from "./dashboard_components/Apps";

// Marketing pages layout wrapper
const MarketingLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auth screens (full-page layout, no marketing chrome) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public Marketing Landing Pages (includes Navbar and Footer) */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Secure TradeDash Trading Terminal (Custom Layout) */}
        <Route path="/dashboard" element={<Home />}>
          <Route index element={<Summary />} />
          <Route path="orders" element={<Orders />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="positions" element={<Positions />} />
          <Route path="funds" element={<Funds />} />
          <Route path="apps" element={<Apps />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);