const { Schema } = require('mongoose');

const OrdersSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    qty: Number,
    price: Number,
    mode: String,        // BUY or SELL
    orderType: String,   // MARKET, LIMIT, STOP_LOSS
    status: String,      // COMPLETED, PENDING
    createdAt: { type: Date, default: Date.now }
});

module.exports = { OrdersSchema };