const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalBudget: {type: Number, required: true},
  categories: [
    {
      category: { type: String, enum: ["Savings", "Transport", "Entertainment", "Groceries", "Rent", "Others"], required: true },
      allocatedAmount: { type: Number, required: true },
    }
  ],
  timePeriod: { type: String, default: "monthly" }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Budget", BudgetSchema);