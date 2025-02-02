const express = require("express");
const CashFlow = require("../models/CashFlow");
const router = express.Router();

router.post("/cashFlow", async (req, res) => {
  const newEntry = new CashFlow(req.body);
  await newEntry.save();
  res.status(201).json(newEntry);
});

router.get("/cashFlow/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cashFlows = await CashFlow.find({ userId });
  
      if (cashFlows.length === 0) {
        return res.status(404).json({ message: "No cash flows found for this user" });
      }
  
      res.status(200).json(cashFlows);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  router.delete("/cashFlow/:id", async (req, res) => {
    const { id } = req.params;  
  
    try {
      const deletedCashFlow = await CashFlow.findByIdAndDelete(id);
  
      if (!deletedCashFlow) {
        return res.status(404).json({ message: "CashFlow not found" });
      }

      res.status(200).json({ message: "CashFlow deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;