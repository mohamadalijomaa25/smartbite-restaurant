require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/**
 * ✅ CORS (safe for Netlify + localhost + mobile)
 * - Allows localhost for dev
 * - Allows any *.netlify.app (so if you changed Netlify account/site, it still works)
 * - Allows your specific old domain too (optional)
 */
const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://smartbiterestaurantlb.netlify.app",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl, some mobile browsers)
      if (!origin) return callback(null, true);

      // allow your known list
      if (allowedOrigins.has(origin)) return callback(null, true);

      // allow any Netlify subdomain (useful if you created a new Netlify site)
      if (origin.endsWith(".netlify.app")) return callback(null, true);

      return callback(null, false); // don't throw (prevents crashing)
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ handle JSON
app.use(express.json());

// ✅ explicit preflight handler (NO "*" wildcard)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("SmartBite backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
