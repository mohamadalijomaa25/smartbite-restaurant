// backend/server.js
// Author: Mohamad Ali Jomaa

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");


const app = express();

/**
 * ✅ CORS (Netlify + Vercel + localhost + mobile)
 * - Allows localhost for dev
 * - Allows any *.netlify.app
 * - Allows any *.vercel.app
 * - Prevents crashes (never throws in origin callback)
 */
const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",

  // Keep your previous Netlify site (optional)
  "https://stellar-pixie-5dfb67.netlify.app",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, some mobile browsers)
      if (!origin) return callback(null, true);

      // Allow known list
      if (allowedOrigins.has(origin)) return callback(null, true);

      // Allow any Netlify subdomain
      if (origin.endsWith(".netlify.app")) return callback(null, true);

      // ✅ Allow any Vercel subdomain
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      // Block everything else (no crash)
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON body parsing
app.use(express.json());

// ✅ Preflight handler (Express 5 safe)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => {
  res.send("SmartBite backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/orders", adminOrderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
