const express = require("express");
const FinancialProfile = require("../models/FinancialProfile");
const router = express.Router();

router.post("/financialProfile", async (req, res) => {
  const { userId, age, employmentStatus, monthlyIncome, financialGoal, additionalNotes } = req.body;

  if (!userId || !age || !employmentStatus || !monthlyIncome || !financialGoal) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingProfile = await FinancialProfile.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({ message: "Financial profile already exists for this user!" });
    }

    const newProfile = new FinancialProfile({
      userId,
      age,
      employmentStatus,
      monthlyIncome,
      financialGoal,
      additionalNotes
    });

    await newProfile.save();

    res.status(201).json(newProfile);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/financialProfile/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const profile = await FinancialProfile.findOne({ userId });
  
      if (!profile) {
        return res.status(404).json({ message: "No financial profile found for this user." });
      }
  
      res.status(200).json(profile);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

router.put("/financialProfile/:userId", async (req, res) => {
    const { userId } = req.params;
    const { age, employmentStatus, monthlyIncome, financialGoal, additionalNotes } = req.body;
  
    try {
      const updatedProfile = await FinancialProfile.findOneAndUpdate(
        { userId },
        { age, employmentStatus, monthlyIncome, financialGoal, additionalNotes },
        { new: true }  
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ message: "Financial profile not found." });
      }
  
      res.status(200).json(updatedProfile);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

router.delete("/financialProfile/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const deletedProfile = await FinancialProfile.findOneAndDelete({ userId });
  
      if (!deletedProfile) {
        return res.status(404).json({ message: "No financial profile found for this user." });
      }
  
      res.status(200).json({ message: "Financial profile deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
module.exports = router;
