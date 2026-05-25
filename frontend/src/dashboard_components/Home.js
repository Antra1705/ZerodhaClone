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
      .catch(() => {
        navigate("/login", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0d0f12",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#4184f3", marginBottom: "15px" }}>TradeDash</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#9ca3af", fontSize: "0.95rem" }}>
          <i className="fa fa-circle-o-notch fa-spin"></i> Checking authentication...
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

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
