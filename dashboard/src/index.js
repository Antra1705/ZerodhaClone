import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./components/Home";
import Summary from "./components/Summary";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import Funds from "./components/Funds";
import Apps from "./components/Apps";

import api from "./api";

const Root = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api
      .get("/allHoldings")
      .then(() => setAuthorized(true))
      .catch(() => {
        window.location.href = "http://localhost:3000/login";
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Checking authentication...</h2>;
  }

  if (!authorized) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard layout */}
        <Route path="/" element={<Home />}>
          {/* Default dashboard page */}
          <Route index element={<Summary />} />

          {/* Sub routes */}
          <Route path="orders" element={<Orders />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="positions" element={<Positions />} />
          <Route path="funds" element={<Funds />} />
          <Route path="apps" element={<Apps />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
