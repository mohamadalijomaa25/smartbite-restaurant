// backend/routes/orderRoutes.js
const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// All order routes require authentication
router.use(auth);

// POST /api/orders  → create new order
router.post("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, total, status } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    if (!total) {
      return res.status(400).json({ message: "Total is required" });
    }

    // default status if not provided
    const orderStatus = status || "received";

    const [result] = await pool.query(
      "INSERT INTO orders (user_id, items, total, status) VALUES (?, ?, ?, ?)",
      [userId, JSON.stringify(items), total, orderStatus]
    );

    return res.status(201).json({
      message: "Order created",
      orderId: result.insertId,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders  → list all orders for current user
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;

    const [rows] = await pool.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    return res.json(rows);
  } catch (err) {
    console.error("Get orders error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders/:id  → get single order by id (only if it belongs to user)
router.get("/:id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;

    const [rows] = await pool.query(
      "SELECT * FROM orders WHERE id = ? AND user_id = ?",
      [orderId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("Get order error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/orders/:id  → update status manually (e.g. to 'preparing', 'delivering', 'delivered')
router.put("/:id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Optional: validate allowed status values
    const allowed = ["received", "preparing", "delivering", "delivered"];
    if (!allowed.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status value", allowedStatuses: allowed });
    }

    const [result] = await pool.query(
      "UPDATE orders SET status = ? WHERE id = ? AND user_id = ?",
      [status, orderId, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Order not found or not your order" });
    }

    return res.json({ message: "Order status updated" });
  } catch (err) {
    console.error("Update order status error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// OPTIONAL: PUT /api/orders/:id/next  → move to next status step
router.put("/:id/next", async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;

    // get current status
    const [rows] = await pool.query(
      "SELECT status FROM orders WHERE id = ? AND user_id = ?",
      [orderId, userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Order not found or not your order" });
    }

    const currentStatus = rows[0].status;
    const statuses = ["received", "preparing", "delivering", "delivered"];
    const currentIndex = statuses.indexOf(currentStatus);

    if (currentIndex === -1 || currentIndex === statuses.length - 1) {
      return res.json({
        message: "Order is already at final status",
        status: currentStatus,
      });
    }

    const nextStatus = statuses[currentIndex + 1];

    const [result] = await pool.query(
      "UPDATE orders SET status = ? WHERE id = ? AND user_id = ?",
      [nextStatus, orderId, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Order not found or not your order" });
    }

    return res.json({
      message: "Order status moved to next step",
      status: nextStatus,
    });
  } catch (err) {
    console.error("Next status error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/orders/:id  → delete order (optional)
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;

    const [result] = await pool.query(
      "DELETE FROM orders WHERE id = ? AND user_id = ?",
      [orderId, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Order not found or not your order" });
    }

    return res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Delete order error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
