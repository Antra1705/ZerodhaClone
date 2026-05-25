import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import api from "../api";
import "./Dashboard.css";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api
      .get("/allHoldings")
      .then(() => setAuthorized(true))
      .catch(() => navigate("/login", { replace: true }))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="terminal-boot">
        <div className="terminal-boot-logo">TradeDash</div>
        <div className="terminal-boot-status">
          <span className="terminal-pulse" />
          Authenticating session…
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="dashboard-root">
      <TopBar />
      <div className="dashboard-body">
        <Dashboard>
          <Outlet />
        </Dashboard>
      </div>
    </div>
  );
};

export default Home;
