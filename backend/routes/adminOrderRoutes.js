const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(auth);
router.use(adminOnly);

const ALLOWED_STATUSES = ["received", "preparing", "delivering", "delivered"];

// GET /api/admin/orders  -> all orders (with user info)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        o.id, o.user_id, o.items, o.total, o.status, o.created_at,
        u.name AS user_name, u.email AS user_email
      FROM orders o
      JOIN users u ON u.id = o.user_id
      ORDER BY o.created_at DESC
    `);

    return res.json(rows);
  } catch (err) {
    console.error("Admin list orders error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/admin/orders/:id/status  -> update any order status
router.put("/:id/status", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: "Status is required" });
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        allowedStatuses: ALLOWED_STATUSES,
      });
    }

    const [result] = await pool.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({ message: "Order status updated" });
  } catch (err) {
    console.error("Admin update order status error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
