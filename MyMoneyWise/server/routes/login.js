const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
