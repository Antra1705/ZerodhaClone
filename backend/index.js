require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/AuthRoute");
const { verifyJWT } = require("./middleware/auth");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
    ].filter(Boolean), // Filter out undefined if env vars are not set
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
    const newOrder = new OrdersModel({
      userId: req.userId,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.json({ msg: "Order saved!" });
  } catch (err) {
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

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(console.error);
