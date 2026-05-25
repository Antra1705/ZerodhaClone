import React, { useState } from "react";
import api from "../api";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, docked = false }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(150.0);
  const [orderMode, setOrderMode] = useState("BUY");
  const [orderType, setOrderType] = useState("MARKET");

  const handleOrderSubmit = () => {
    api
      .post("/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: orderType === "MARKET" ? 150.0 : Number(stockPrice),
        mode: orderMode,
        orderType: orderType,
      })
      .then(() => {
        if (!docked) {
          /* legacy modal */
        }
      })
      .catch(() => {
        alert("Failed to place trade. Please verify connection.");
      });
  };

  const content = (
    <div className={`order-window-container ${orderMode.toLowerCase()} ${docked ? "docked" : ""}`}>
      <div className="order-window-header">
        <div>
          <h3>Order Ticket</h3>
          <span className="exchange-tag">NASDAQ · SMART ROUTE</span>
        </div>
        <span className="stock-ticker mono">{uid || "—"}</span>
      </div>

      <div className="mode-toggle-bar">
        <button
          type="button"
          className={`mode-btn buy-toggle ${orderMode === "BUY" ? "active" : ""}`}
          onClick={() => setOrderMode("BUY")}
        >
          BUY
        </button>
        <button
          type="button"
          className={`mode-btn sell-toggle ${orderMode === "SELL" ? "active" : ""}`}
          onClick={() => setOrderMode("SELL")}
        >
          SELL
        </button>
      </div>

      <div className="regular-order">
        <div className="inputs-row">
          <fieldset className="input-group">
            <legend>Qty</legend>
            <input
              type="number"
              min="1"
              className="mono"
              onChange={(e) => setStockQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset className="input-group">
            <legend>Price ($)</legend>
            <input
              type="number"
              step="0.05"
              className="mono"
              disabled={orderType === "MARKET"}
              onChange={(e) => setStockPrice(parseFloat(e.target.value) || 0)}
              value={orderType === "MARKET" ? "" : stockPrice}
              placeholder={orderType === "MARKET" ? "MKT" : "0.00"}
            />
          </fieldset>
        </div>

        <div className="order-type-selector">
          <label className="type-label">Order type</label>
          <div className="type-buttons">
            {["MARKET", "LIMIT", "STOP_LOSS"].map((type) => (
              <button
                key={type}
                type="button"
                className={`type-btn ${orderType === type ? "active" : ""}`}
                onClick={() => setOrderType(type)}
              >
                {type === "STOP_LOSS" ? "Stop" : type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="buttons-footer">
        <span className="margin-estimate mono">
          Est. margin <strong>${(stockQuantity * (orderType === "MARKET" ? 150 : stockPrice)).toFixed(2)}</strong>
        </span>
        <button
          type="button"
          className={`submit-order-btn ${orderMode === "BUY" ? "btn-buy" : "btn-sell"}`}
          onClick={handleOrderSubmit}
        >
          {orderMode} {uid}
        </button>
      </div>
    </div>
  );

  if (docked) {
    return <div className="order-ticket-docked">{content}</div>;
  }

  return (
    <div className="order-window-overlay">
      {content}
    </div>
  );
};

export default BuyActionWindow;
