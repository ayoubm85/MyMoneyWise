const express = require("express");
const { analyzeExpense } = require("../services/aiService");
const Expense = require("../models/CashFlow");

const router = express.Router();

// AI Analysis for a single expense
router.post("/analyze-expense", async (req, res) => {
    try {
        const { userId, amount, category, description } = req.body;

        if (!userId || !amount || !category) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Fetch recent expenses for context (last 30 days)
        const recentExpenses = await Expense.find({ 
            userId, 
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
        });

        // Call the AI analysis function
        const analysis = await analyzeExpense({ amount, category, description }, recentExpenses);

        return res.json(analysis);
    } catch (error) {
        console.error("❌ AI Analysis API Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;