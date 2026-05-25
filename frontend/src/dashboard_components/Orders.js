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
      <div className="terminal-page">
        <p className="page-meta mono">Loading orders…</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="terminal-page orders">
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
    <div className="terminal-page orders">
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
              const isCompleted = displayStatus === "COMPLETED";

              return (
                <tr key={index}>
                  <td style={{ textAlign: "left", fontWeight: "600" }}>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>${order.price.toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    <span className={`badge ${isBuy ? "badge-buy" : "badge-sell"}`}>{displayMode}</span>
                  </td>
                  <td style={{ textAlign: "center" }} className="page-meta">
                    {displayType}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className={`badge ${isCompleted ? "badge-ok" : "badge-pending"}`}>{displayStatus}</span>
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