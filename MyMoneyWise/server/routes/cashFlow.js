const express = require("express");
const CashFlow = require("../models/CashFlow");
const router = express.Router();

router.post("/cashflow", async (req, res) => {
  const newEntry = new CashFlow(req.body);
  await newEntry.save();
  res.status(201).json(newEntry);
});

module.exports = router;