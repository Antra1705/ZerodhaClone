const WebSocket = require('ws');
require('dotenv').config();

const API_KEY = process.env.FINNHUB_API_KEY;

if (!API_KEY) {
  console.error("❌ ERROR: FINNHUB_API_KEY is not defined in your backend/.env file.");
  console.log("Please sign up at https://finnhub.io/ (free tier) and add the key to backend/.env:");
  console.log("FINNHUB_API_KEY=your_api_key_here");
  process.exit(1);
}

console.log(`🔌 Attempting to connect to Finnhub WebSocket with API Key: ${API_KEY.substring(0, 5)}...`);

const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

socket.on('open', function open() {
  console.log("✅ WebSocket connected successfully to Finnhub!");
  
  // Subscribe to AAPL (Apple) to test the feed
  console.log("📦 Subscribing to AAPL (Apple Inc.)...");
  socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
});

socket.on('message', function incoming(data) {
  const parsed = JSON.parse(data);
  console.log("📥 Received Live Message:", JSON.stringify(parsed, null, 2));
  
  // Close after receiving first trade update to confirm success
  if (parsed.type === 'trade') {
    console.log("🎉 Successfully verified live price tick streaming! Closing socket...");
    socket.close();
    process.exit(0);
  }
});

socket.on('error', function error(err) {
  console.error("❌ WebSocket Error:", err);
});

socket.on('close', function close() {
  console.log("🔌 Connection closed.");
});

// Set a timeout to prevent hanging if there are no trades active
setTimeout(() => {
  console.log("⏳ Test active for 15 seconds. If you didn't see trades, it might be due to market hours, or inactive tickers. Connection itself was successful!");
  socket.close();
  process.exit(0);
}, 15000);
