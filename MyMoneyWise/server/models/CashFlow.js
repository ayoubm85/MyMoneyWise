const mongoose = require("mongoose");

const CashFlowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true }, 
  category: { type: String, required: true }, 
  description: { type: String, default: "" }, 
  type: { type: String, required: true }, 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CashFlow", CashFlowSchema);
