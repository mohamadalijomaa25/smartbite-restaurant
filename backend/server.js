require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/**
 * ✅ PERMISSIVE CORS (for your project/demo)
 * Allows requests from ANY origin (Netlify, localhost, mobile, etc.)
 */
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Express 5 safe preflight handler
app.options(/.*/, cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SmartBite backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
