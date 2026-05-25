import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { watchlist as initialWatchlist } from "../data/data";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";
import { io } from "socket.io-client";

ChartJS.register(ArcElement, ChartTooltip, Legend);

const WatchList = () => {
  const [stocks, setStocks] = useState(initialWatchlist);

  useEffect(() => {
    // Establish connection to backend Socket.io server
    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:3002", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🔌 Connected to TradeDash real-time stream!");
    });

    socket.on("price-update", (data) => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          if (stock.name === data.symbol) {
            const oldPrice = stock.price;
            const newPrice = data.price;
            const diff = newPrice - oldPrice;
            
            let isDown = stock.isDown;
            if (diff !== 0) {
              isDown = diff < 0;
            }

            // Calculate percentage change to keep it realistic
            const pctVal = ((newPrice - oldPrice) / (oldPrice || 1)) * 100;
            const currentPctNum = parseFloat(stock.percent.replace("%", ""));
            const newPct = (currentPctNum + pctVal).toFixed(2) + "%";

            return {
              ...stock,
              price: newPrice,
              percent: (pctVal >= 0 ? "+" : "") + newPct,
              isDown,
              isFlashUp: diff > 0,
              isFlashDown: diff < 0,
            };
          }
          return stock;
        })
      );

      // Clear the flash visual animation state after 500ms
      setTimeout(() => {
        setStocks((prevStocks) =>
          prevStocks.map((stock) => {
            if (stock.name === data.symbol) {
              return {
                ...stock,
                isFlashUp: false,
                isFlashDown: false,
              };
            }
            return stock;
          })
        );
      }, 500);
    });

    socket.on("connect_error", (err) => {
      console.warn("⚠️ TradeDash real-time connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const chartLabels = stocks.map((s) => s.name);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Price",
        data: stocks.map((s) => s.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search symbols eg: AAPL, TSLA, NVDA"
          className="search"
        />
        <span className="counts"> {stocks.length} / 50</span>
      </div>

      <ul className="list">
        {stocks.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>
      <div style={{ height: "200px", width: "100%", marginTop: "20px" }}>
        <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };

  // Setup visual flashing micro-animations
  let itemClasses = "item";
  if (stock.isFlashUp) itemClasses += " flash-up-tick";
  if (stock.isFlashDown) itemClasses += " flash-down-tick";

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={itemClasses} style={{ transition: "background-color 0.3s ease", padding: "10px 15px" }}>
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price.toFixed(2)}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  const handleAnalyticsClick = () => {
    generalContext.openAnalyticsWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={handleAnalyticsClick}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};