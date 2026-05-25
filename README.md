# 🚀 TradeDash — Premium Real-Time US Equities Trading Terminal

TradeDash is a high-performance, responsive stock trading application designed to simulate a modern, feature-rich broker terminal. It is built using a Node.js/Express API server and a unified React SPA that serves the marketing site, authentication flows, and the secure trading terminal on a single origin.

The application has been rebuilt from a static frontend mock into an active, real-data trading platform utilizing real-time WebSocket pipelines, TradingView analytics charts, robust database transactions, and comprehensive security guardrails.

---

## ⚡ Key Architectural Features

### 1. Real-Time Price Streaming (Socket.io + WebSocket)
* **Backend Relay**: Rather than hitting Finnhub directly from multiple browser clients (which triggers instant rate-limiting), a single server-side client maintains a resilient connection to `wss://ws.finnhub.io`.
* **Price Broadcaster**: Trade ticks are read, parsed, and relayed downstream to all open dashboard tabs instantly via **Socket.io**.
* **Visual Micro-Animations**: The frontend watchlist updates dynamically in response to socket price feeds. Rows flash subtle green (price up) or red (price down) background pulses to enhance scannability.

### 2. High-Performance TradingView Charts
* **TradingView Integration**: Simplistic graphs have been replaced with **`lightweight-charts`** (TradingView’s native charting engine).
* **OHLC & Volume**: Clicking the **Analytics** button for any symbol launches a slide-over panel displaying an interactive daily **Candlestick Chart**, switchable **Line Series**, and a synchronized bottom **Volume Histogram**.

### 3. API Quota Defense (Caching & Auth Guard)
* **JWT Secured Route**: The chart endpoint `/api/chart/:symbol` is protected behind a **verifyJWT** token validator, preventing unauthenticated scraping from exhausting resources.
* **In-Memory Caching (5m TTL)**: Fetched candles are stored in a server-side cache. Concurrent chart requests or page updates for the same asset load instantly from the cache, completely shielding your Finnhub REST quotas. (Scales seamlessly to Redis in cluster configurations).

### 4. Advanced Transaction Ledger
* **Schema Enforcement**: Mongoose models explicitly track `userId`, `orderType` (MARKET/LIMIT/STOP_LOSS), `mode` (BUY/SELL), and `status` (COMPLETED/PENDING).
* **Buy/Sell Tickets**: The order placement ticket handles price locks based on order types. MARKET trades execute immediately at the current LTP and save as `COMPLETED`. LIMIT and STOP_LOSS entries write to the ledger as `PENDING`.

---

## 🛠️ Technology Stack
* **Unified Frontend (port 3000)**: React, React Router, Material UI Icons, Chart.js (Summary), TradingView `lightweight-charts` (Analytics), Socket.io client (watchlist).
* **Backend API**: Node.js, Express, Socket.io, Native `ws` client, Mongoose, JWT.
* **Database**: MongoDB (Atlas Cloud).

---

## 🚀 Local Setup & Installation

### Prerequisite: Obtain Finnhub API Key
1. Sign up for a free developer account at [Finnhub.io](https://finnhub.io/).
2. Copy your personal developer token.

### 📁 Backend Configuration
1. Navigate to `/backend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file containing:
   ```env
   PORT=3002
   MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/tradedash
   TOKEN_KEY=your_jwt_signing_key_here
   FINNHUB_API_KEY=your_finnhub_token_here
   ```
4. Start backend server:
   ```bash
   npm run dev
   ```

### 📁 Frontend (Unified SPA)
1. Navigate to `/frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Optional: create `.env` with `REACT_APP_API_URL=http://localhost:3002` for local API (defaults to production URL if unset).
4. Start the application on port 3000:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) for marketing pages, `/login` for sign-in, and `/dashboard` for the trading terminal after authentication.

---

## 🛡️ Error Boundary & Resiliency Engineering
* **Startup Boundary Guard**: The server immediately performs an environment verification check on boot. If environment variables are missing, it halts startup and logs detailed configuration tips.
* **WebSocket Drop Recovery**: The backend implements an exponential backoff loop. If connection to Finnhub fails, it retries connecting at 1s, 2s, 4s... capping retry delays at 30s.
* **Heartbeat Verification**: The server exchanges ping/pong packages with Finnhub to identify and restart silent/zombie connections.
* **Symbol Boundary Safety**: Searching or requesting a bad ticker loads a graceful "No Chart Data Available" UI banner rather than causing client crashes.
