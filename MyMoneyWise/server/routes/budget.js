const express = require("express");
const Budget = require("../models/Budget");
const CashFlow = require("../models/CashFlow")
const { analyzeBudget }= require("../services/aiService")
const router = express.Router();

router.post("/budget", async (req, res) => {
  const { userId, totalBudget, categories, timePeriod } = req.body;

  if (!userId || !totalBudget || !categories || categories.length === 0) {
    return res.status(400).json({ message: "User ID, totalBudget, and categories are required." });
  }

  try {
    const existingBudget = await Budget.findOne({ userId });

    if (existingBudget) {
      return res.status(400).json({ message: "A budget already exists for this user." });
    }

    const newBudget = new Budget({
      userId,
      totalBudget,
      categories,
      timePeriod,
      createdAt: Date.now()
    });

    await newBudget.save();

    res.status(201).json(newBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/budget/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const budget = await Budget.findOne({ userId });
  
      if (!budget) {
        return res.status(404).json({ message: "No budget found for this user." });
      }
  
      res.status(200).json(budget);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

router.delete("/budget/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const deletedBudget = await Budget.findOneAndDelete({ userId });
  
      if (!deletedBudget) {
        return res.status(404).json({ message: "No budget found for this user." });
      }
  
      res.status(200).json({ message: "Budget deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

router.post("/budget/analyze", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const budget = await Budget.findOne({ userId });
    if (!budget) {
      return res.status(404).json({ error: "No budget found for user." });
    }

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const expenses = await CashFlow.find({
      userId,
      type: "expense",
    createdAt: { $gte: startOfMonth }, 
    });

    const aiResponse = await analyzeBudget(budget, expenses);

    res.json(aiResponse);
  } catch (error) {
    console.error("❌ Budget Analysis Error:", error);
    res.status(500).json({ error: "AI budget analysis failed." });
  }
});
  

module.exports = router;
