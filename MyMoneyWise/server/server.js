const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.use("/api", require("./routes/login"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/cashFlow"));
app.use("/api", require("./routes/aiAnalysis"));
app.use("/api", require("./routes/budget"));
app.use("/api", require("./routes/financialProfile"));  

app.listen(5000, () => console.log("🚀 Server running on port 5000"));