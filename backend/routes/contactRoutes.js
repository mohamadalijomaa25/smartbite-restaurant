// backend/routes/contactRoutes.js
const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    return res.status(201).json({ message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact message error:", err);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
