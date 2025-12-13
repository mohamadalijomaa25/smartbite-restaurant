require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/**
 * ✅ CORS CONFIG
 * - Allows:
 *   • localhost (development)
 *   • ANY Netlify site (*.netlify.app)
 *   • requests without origin (Postman, mobile webviews)
 */
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, mobile browser)
      if (!origin) return callback(null, true);

      const isLocalhost =
        origin === "http://localhost:3000" ||
        origin === "http://127.0.0.1:3000";

      const isNetlify = origin.endsWith(".netlify.app");

      if (isLocalhost || isNetlify) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Express 5 safe preflight handler (DO NOT use "*")
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
