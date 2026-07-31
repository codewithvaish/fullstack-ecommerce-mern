const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// MongoDB Connect
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Product Route
app.use("/api/products", require("./routes/productRoutes"));

// Test API
app.get("/", (req, res) => {
  res.send("API Running");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
