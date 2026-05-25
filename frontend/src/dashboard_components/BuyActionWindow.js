import React, { useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(150.0);
  const [orderMode, setOrderMode] = useState("BUY"); // "BUY" or "SELL"
  const [orderType, setOrderType] = useState("MARKET"); // "MARKET", "LIMIT", "STOP_LOSS"

  const generalContext = useContext(GeneralContext);

  const handleOrderSubmit = () => {
    // For MARKET order, execution happens instantly at mock LTP, LIMIT uses manual price
    api.post("/newOrder", {
      name: uid,
      qty: Number(stockQuantity),
      price: orderType === "MARKET" ? 150.0 : Number(stockPrice),
      mode: orderMode,
      orderType: orderType,
    })
    .then(() => {
      generalContext.closeBuyWindow();
    })
    .catch((err) => {
      console.error("❌ Order placement failed:", err);
      alert("Failed to place trade. Please verify connection.");
    });
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="order-window-overlay">
      <div className={`order-window-container ${orderMode.toLowerCase()}`} id="buy-window">
        
        {/* Header Block */}
        <div className="order-window-header">
          <div>
            <h3>Place {orderMode} Order</h3>
            <span className="exchange-tag">NASDAQ US MARKET</span>
          </div>
          <span className="stock-ticker">{uid}</span>
        </div>

        {/* Dynamic Mode Switcher */}
        <div className="mode-toggle-bar">
          <button 
            className={`mode-btn buy-toggle ${orderMode === "BUY" ? "active" : ""}`}
            onClick={() => setOrderMode("BUY")}
          >
            BUY
          </button>
          <button 
            className={`mode-btn sell-toggle ${orderMode === "SELL" ? "active" : ""}`}
            onClick={() => setOrderMode("SELL")}
          >
            SELL
          </button>
        </div>

        {/* Form Fields */}
        <div className="regular-order">
          <div className="inputs-row">
            <fieldset className="input-group">
              <legend>Quantity</legend>
              <input
                type="number"
                name="qty"
                id="qty"
                min="1"
                onChange={(e) => setStockQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                value={stockQuantity}
              />
            </fieldset>

            <fieldset className="input-group">
              <legend>Price ($)</legend>
              <input
                type="number"
                name="price"
                id="price"
                step="0.05"
                disabled={orderType === "MARKET"}
                onChange={(e) => setStockPrice(parseFloat(e.target.value) || 0)}
                value={orderType === "MARKET" ? "" : stockPrice}
                placeholder={orderType === "MARKET" ? "Market (LTP)" : "Enter price"}
              />
            </fieldset>
          </div>

          {/* Type Selectors */}
          <div className="order-type-selector">
            <label className="type-label">Order Type</label>
            <div className="type-buttons">
              <button 
                type="button"
                className={`type-btn ${orderType === "MARKET" ? "active" : ""}`}
                onClick={() => setOrderType("MARKET")}
              >
                Market
              </button>
              <button 
                type="button"
                className={`type-btn ${orderType === "LIMIT" ? "active" : ""}`}
                onClick={() => setOrderType("LIMIT")}
              >
                Limit
              </button>
              <button 
                type="button"
                className={`type-btn ${orderType === "STOP_LOSS" ? "active" : ""}`}
                onClick={() => setOrderType("STOP_LOSS")}
              >
                Stop-Loss
              </button>
            </div>
          </div>
        </div>

        {/* Estimate & Execution Footer */}
        <div className="buttons-footer">
          <span className="margin-estimate">
            Margin required: <strong>${(stockQuantity * (orderType === "MARKET" ? 150 : stockPrice)).toFixed(2)}</strong>
          </span>
          <div className="action-buttons">
            <button 
              className={`submit-order-btn ${orderMode === "BUY" ? "btn-blue" : "btn-orange"}`}
              onClick={handleOrderSubmit}
            >
              {orderMode === "BUY" ? "BUY Stock" : "SELL Stock"}
            </button>
            <button className="cancel-order-btn" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuyActionWindow;