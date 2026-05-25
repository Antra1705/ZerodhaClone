import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  FiberManualRecord,
} from "@mui/icons-material";
import { watchlist as initialWatchlist } from "../dashboard_data/data";
import { io } from "socket.io-client";

const WatchList = () => {
  const { selectedSymbol, setSelectedSymbol } = useContext(GeneralContext);
  const [stocks, setStocks] = useState(initialWatchlist);
  const [filter, setFilter] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:3002", {
      withCredentials: true,
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("price-update", (data) => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          if (stock.name !== data.symbol) return stock;

          const oldPrice = stock.price;
          const newPrice = data.price;
          const diff = newPrice - oldPrice;
          const pctVal = ((newPrice - oldPrice) / (oldPrice || 1)) * 100;
          const currentPctNum = parseFloat(String(stock.percent).replace("%", "").replace("+", ""));
          const newPct = (currentPctNum + pctVal).toFixed(2);

          return {
            ...stock,
            price: newPrice,
            percent: `${pctVal >= 0 ? "+" : ""}${newPct}%`,
            isDown: diff !== 0 ? diff < 0 : stock.isDown,
            isFlashUp: diff > 0,
            isFlashDown: diff < 0,
          };
        })
      );

      setTimeout(() => {
        setStocks((prev) =>
          prev.map((stock) =>
            stock.name === data.symbol
              ? { ...stock, isFlashUp: false, isFlashDown: false }
              : stock
          )
        );
      }, 420);
    });

    return () => socket.disconnect();
  }, []);

  const filtered = stocks.filter((s) =>
    s.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <span className="watchlist-title">Watchlist</span>
        <span className={`live-badge ${connected ? "live" : ""}`}>
          <FiberManualRecord className="live-dot" />
          {connected ? "LIVE" : "OFF"}
        </span>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Symbol…"
          className="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <span className="counts">{filtered.length}</span>
      </div>

      <div className="watchlist-col-labels">
        <span>Symbol</span>
        <span>Chg%</span>
        <span>Last</span>
      </div>

      <ul className="list">
        {filtered.map((stock) => (
          <WatchListItem
            key={stock.name}
            stock={stock}
            active={selectedSymbol === stock.name}
            onSelect={() => setSelectedSymbol(stock.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, active, onSelect }) => {
  const [showActions, setShowActions] = useState(false);
  const generalContext = useContext(GeneralContext);

  let rowClass = "watchlist-row";
  if (active) rowClass += " selected";
  if (stock.isFlashUp) rowClass += " flash-up-tick";
  if (stock.isFlashDown) rowClass += " flash-down-tick";

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <button type="button" className={rowClass} onClick={onSelect}>
        <span className={`symbol-name ${stock.isDown ? "down" : "up"}`}>{stock.name}</span>
        <span className={`chg mono ${stock.isDown ? "down" : "up"}`}>{stock.percent}</span>
        <span className={`last mono ${stock.isDown ? "down" : "up"}`}>
          {stock.price.toFixed(2)}
        </span>
        {stock.isDown ? (
          <KeyboardArrowDown className="tick-icon down" />
        ) : (
          <KeyboardArrowUp className="tick-icon up" />
        )}
      </button>
      {showActions && (
        <WatchListActions
          uid={stock.name}
          onBuy={() => generalContext.openBuyWindow(stock.name)}
          onChart={() => generalContext.openAnalyticsWindow(stock.name)}
        />
      )}
    </li>
  );
};

const WatchListActions = ({ uid, onBuy, onChart }) => (
  <span className="actions">
    <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
      <button type="button" className="buy" onClick={onBuy}>
        B
      </button>
    </Tooltip>
    <Tooltip title="Chart" placement="top" arrow TransitionComponent={Grow}>
      <button type="button" className="action" onClick={onChart}>
        <BarChartOutlined className="icon" />
      </button>
    </Tooltip>
    <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
      <button type="button" className="action">
        <MoreHoriz className="icon" />
      </button>
    </Tooltip>
  </span>
);
