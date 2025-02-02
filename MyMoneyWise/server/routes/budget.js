const express = require("express");
const Budget = require("../models/Budget");
const CashFlow = require("../models/CashFlow");
const FinancialProfile = require("../models/FinancialProfile");
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

  router.post("/budget/analyze", async (req, res) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
      }
      
      const budget = await Budget.findOne({ userId });
      if (!budget || !budget.categories || budget.categories.length === 0) {
        console.log("❌ No budget or empty categories for user:", userId);
        return res.status(404).json({ error: "No budget or empty categories found for user." });
      }
  
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const expenses = await CashFlow.find({ userId, date: { $gte: startOfMonth } });
  

      let financialProfile = await FinancialProfile.findOne({ userId });

      if (!financialProfile) {
        console.log("❌ No financial profile found. Creating a default profile.");
        financialProfile = {
          age: null,
          employmentStatus: "Unknown",
          monthlyIncome: 0,
          financialGoal: "Not specified",
          additionalNotes: "",
        };
      }

      const aiResponse = await analyzeBudget(budget, expenses, financialProfile);
  
      res.json(aiResponse);
    } catch (error) {
      console.error("❌ Budget Analysis Error:", error);
      res.status(500).json({ error: "AI budget analysis failed." });
    }
  });
  
  router.put("/budget/:userId", async (req, res) => {
    const { userId } = req.params;
    const { totalBudget, categories } = req.body;
  
    if (!totalBudget || !categories || categories.length === 0) {
      return res.status(400).json({ message: "Total budget and categories are required." });
    }
  
    try {
      const updatedBudget = await Budget.findOneAndUpdate(
        { userId },
        { totalBudget, categories },
        { new: true, runValidators: true } 
      );
  
      if (!updatedBudget) {
        return res.status(404).json({ message: "No budget found for this user." });
      }
  
      res.status(200).json(updatedBudget);
    } catch (error) {
      console.error("❌ Error updating budget:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
