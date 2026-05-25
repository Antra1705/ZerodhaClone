require("dotenv").config();

// ⚡ Startup Environment Variable Validation
const requiredEnvVars = ["MONGO_URL", "TOKEN_KEY", "FINNHUB_API_KEY"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ STARTUP ERROR: Missing required environment variables!");
  console.error("--------------------------------------------------");
  missingVars.forEach((varName) => {
    console.error(`🔴 ${varName} is missing in backend/.env`);
  });
  console.error("--------------------------------------------------");
  console.error("Please add the missing variables to your .env file and restart the TradeDash server.");
  process.exit(1);
}

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/AuthRoute");
const { verifyJWT } = require("./middleware/auth");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
].filter(Boolean);

const checkCorsOrigin = (origin, callback) => {
  if (!origin) return callback(null, true);
  if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app") || origin.includes("vercel.app")) {
    return callback(null, true);
  }
  return callback(new Error("Not allowed by CORS"));
};

const io = new Server(server, {
  cors: {
    origin: checkCorsOrigin,
    credentials: true,
  }
});

app.use(
  cors({
    origin: checkCorsOrigin,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use(cookieParser());
app.use(express.json());

/* 🔑 AUTH ROUTES */
app.use("/api/auth", authRoute);

/* 🔒 PROTECTED ROUTES */
app.get("/allHoldings", verifyJWT, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", verifyJWT, async (req, res) => {
  try {
    const positions = await PositionsModel.find({});
    res.json(positions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch positions" });
  }
});

app.post("/newOrder", verifyJWT, async (req, res) => {
  try {
    const { name, qty, price, mode, orderType } = req.body;

    // MARKET orders complete immediately; LIMIT / STOP_LOSS remain PENDING
    const status = orderType === "MARKET" ? "COMPLETED" : "PENDING";

    const newOrder = new OrdersModel({
      userId: req.userId,
      name,
      qty: Number(qty),
      price: Number(price),
      mode,       // BUY or SELL
      orderType,  // MARKET, LIMIT, STOP_LOSS
      status,     // COMPLETED, PENDING
    });

    await newOrder.save();
    res.json({ msg: "Order saved!", order: newOrder });
  } catch (err) {
    console.error("❌ Order placement error:", err);
    res.status(500).json({ msg: "Failed to place order" });
  }
});

app.get("/allOrders", verifyJWT, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch orders" });
  }
});

/* 📈 HISTORICAL STOCK CHART ENDPOINT */
const chartCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes TTL

app.get("/api/chart/:symbol", verifyJWT, async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const now = Date.now();

  // Check in-memory cache
  if (chartCache.has(symbol)) {
    const cached = chartCache.get(symbol);
    if (now - cached.timestamp < CACHE_TTL) {
      console.log(`💾 Cache HIT for chart: ${symbol}`);
      return res.json(cached.data);
    } else {
      chartCache.delete(symbol);
    }
  }

  const token = process.env.FINNHUB_API_KEY;
  const toUnix = Math.floor(now / 1000);
  const fromUnix = toUnix - 180 * 24 * 60 * 60; // Past 6 months

  try {
    console.log(`🌐 Cache MISS. Fetching chart data from Finnhub for: ${symbol}`);
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${fromUnix}&to=${toUnix}&token=${token}`
    );

    if (!response.ok) {
      throw new Error(`Finnhub API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.s === "no_data" || !data.c) {
      return res.status(404).json({ msg: "No chart data found for this symbol" });
    }

    // Map Finnhub candle data arrays to { time, open, high, low, close, volume } objects
    const ohlc = data.t.map((timestamp, index) => {
      const date = new Date(timestamp * 1000);
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      return {
        time: formattedDate,
        open: data.o[index],
        high: data.h[index],
        low: data.l[index],
        close: data.c[index],
        volume: data.v[index],
      };
    });

    // Save response to cache
    chartCache.set(symbol, {
      timestamp: now,
      data: ohlc,
    });

    res.json(ohlc);
  } catch (err) {
    console.error(`❌ Error fetching chart for ${symbol}:`, err.message);
    res.status(500).json({ msg: "Failed to fetch stock history data" });
  }
});

// 🔌 Finnhub Live WebSocket Client & Relay
let finnhubWs = null;
let reconnectDelay = 1000;
const maxReconnectDelay = 30000;
let pingInterval = null;
const WATCHLIST_SYMBOLS = ["AAPL", "MSFT", "TSLA", "AMZN", "GOOGL", "NVDA"];

function connectToFinnhub() {
  const token = process.env.FINNHUB_API_KEY;
  if (!token) {
    console.error("❌ ERROR: FINNHUB_API_KEY is not defined in environment variables.");
    return;
  }

  console.log("🔌 Connecting to Finnhub Live WebSocket...");
  finnhubWs = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

  finnhubWs.on("open", () => {
    console.log("✅ Successfully connected to Finnhub WebSocket!");
    reconnectDelay = 1000; // Reset exponential backoff delay

    // Subscribe to default high-liquidity US equities
    WATCHLIST_SYMBOLS.forEach((symbol) => {
      console.log(`📦 Subscribing to trade ticks for: ${symbol}`);
      finnhubWs.send(JSON.stringify({ type: "subscribe", symbol }));
    });

    // Send ping heartbeats every 30 seconds to keep connection alive
    clearInterval(pingInterval);
    pingInterval = setInterval(() => {
      if (finnhubWs && finnhubWs.readyState === WebSocket.OPEN) {
        finnhubWs.ping();
      }
    }, 30000);
  });

  finnhubWs.on("message", (data) => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.type === "trade") {
        parsed.data.forEach((trade) => {
          // Broadcast real-time stock ticks to all connected dashboard client tabs
          io.emit("price-update", {
            symbol: trade.s,
            price: trade.p,
            volume: trade.v,
            timestamp: trade.t,
          });
        });
      }
    } catch (err) {
      console.error("⚠️ Error parsing Finnhub WS data stream:", err);
    }
  });

  finnhubWs.on("close", (code, reason) => {
    console.warn(`🔌 Finnhub WebSocket connection closed (code: ${code}). Reconnecting in ${reconnectDelay}ms...`);
    clearInterval(pingInterval);
    scheduleFinnhubReconnect();
  });

  finnhubWs.on("error", (err) => {
    console.error("❌ Finnhub WebSocket encountered error:", err.message);
  });
}

function scheduleFinnhubReconnect() {
  setTimeout(() => {
    reconnectDelay = Math.min(reconnectDelay * 2, maxReconnectDelay);
    connectToFinnhub();
  }, reconnectDelay);
}

// 👥 Socket.io Client Connection Manager
io.on("connection", (socket) => {
  console.log(`👥 Client tab connected to TradeDash (Socket.id: ${socket.id})`);
  
  socket.on("disconnect", () => {
    console.log(`👥 Client tab disconnected (Socket.id: ${socket.id})`);
  });
});

// Start Finnhub Connection
connectToFinnhub();

server.listen(PORT, () => {
  console.log(`🚀 TradeDash Server started on port ${PORT}`);

  mongoose.connect(MONGO_URL)
    .then(() => console.log("💾 MongoDB Connected Successfully!"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
});
