const mongoose = require("mongoose");

const CashFlowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: Number,
  type: String,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CashFlow", CashFlowSchema);