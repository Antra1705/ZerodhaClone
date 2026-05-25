import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/allOrders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="orders" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
        <p style={{ color: "#666" }}>Loading transaction logs...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn" style={{ background: "#4184f3" }}>
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Transaction Book ({orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Instrument</th>
              <th>Quantity</th>
              <th>Execution Price</th>
              <th style={{ textAlign: "center" }}>Mode</th>
              <th style={{ textAlign: "center" }}>Type</th>
              <th style={{ textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const displayMode = order.mode || "BUY";
              const displayType = order.orderType || "MARKET";
              const displayStatus = order.status || "COMPLETED";

              // Badges colors styling
              const isBuy = displayMode === "BUY";
              const modeStyle = isBuy
                ? { color: "#4184f3", backgroundColor: "rgba(65, 132, 243, 0.1)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600" }
                : { color: "#ff5722", backgroundColor: "rgba(255, 87, 34, 0.1)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600" };

              const isCompleted = displayStatus === "COMPLETED";
              const statusStyle = isCompleted
                ? { color: "#4caf50", backgroundColor: "rgba(76, 175, 80, 0.1)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" }
                : { color: "#ff9800", backgroundColor: "rgba(255, 152, 0, 0.1)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" };

              return (
                <tr key={index}>
                  <td style={{ textAlign: "left", fontWeight: "600", color: "#333" }}>{order.name}</td>
                  <td>{order.qty}</td>
                  <td style={{ fontFamily: "monospace" }}>${order.price.toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    <span style={modeStyle}>{displayMode}</span>
                  </td>
                  <td style={{ textAlign: "center", color: "#666", fontWeight: "500", fontSize: "0.8rem" }}>
                    {displayType}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span style={statusStyle}>{displayStatus}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;