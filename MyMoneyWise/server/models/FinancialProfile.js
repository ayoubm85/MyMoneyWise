const mongoose = require("mongoose");

const FinancialProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  age: { type: Number, required: true }, 
  employmentStatus: { type: String, enum: ["Employed", "Self-Employed", "Unemployed", "Student", "Retired"], required: true }, 
  monthlyIncome: { type: Number, required: true }, 
  financialGoal: { 
    type: String, 
    enum: ["Save Money", "Invest", "Reduce Debt", "Plan for Retirement"], 
    required: true 
  }, 
  additionalNotes: { type: String }, 
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("FinancialProfile", FinancialProfileSchema);
