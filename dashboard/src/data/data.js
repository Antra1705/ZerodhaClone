export const watchlist = [
  {
    name: "AAPL",
    price: 189.84,
    percent: "+1.25%",
    isDown: false,
  },
  {
    name: "MSFT",
    price: 415.50,
    percent: "+0.85%",
    isDown: false,
  },
  {
    name: "TSLA",
    price: 175.46,
    percent: "-2.40%",
    isDown: true,
  },
  {
    name: "AMZN",
    price: 180.15,
    percent: "+1.10%",
    isDown: false,
  },
  {
    name: "GOOGL",
    price: 172.50,
    percent: "-0.45%",
    isDown: true,
  },
  {
    name: "NVDA",
    price: 940.20,
    percent: "+3.15%",
    isDown: false,
  },
];

// holdings
export const holdings = [
  {
    name: "AAPL",
    qty: 5,
    avg: 175.20,
    price: 189.84,
    net: "+8.36%",
    day: "+1.25%",
  },
  {
    name: "MSFT",
    qty: 3,
    avg: 390.45,
    price: 415.50,
    net: "+6.42%",
    day: "+0.85%",
  },
  {
    name: "TSLA",
    qty: 10,
    avg: 185.00,
    price: 175.46,
    net: "-5.16%",
    day: "-2.40%",
    isLoss: true,
  },
  {
    name: "NVDA",
    qty: 2,
    avg: 820.00,
    price: 940.20,
    net: "+14.66%",
    day: "+3.15%",
  }
];

// positions
export const positions = [
  {
    product: "CNC",
    name: "AMZN",
    qty: 5,
    avg: 178.50,
    price: 180.15,
    net: "+0.92%",
    day: "+1.10%",
  },
  {
    product: "CNC",
    name: "GOOGL",
    qty: 8,
    avg: 174.00,
    price: 172.50,
    net: "-0.86%",
    day: "-0.45%",
    isLoss: true,
  },
];