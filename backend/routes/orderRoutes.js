// backend/routes/orderRoutes.js
const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// All order routes require authentication
router.use(auth);

// central place for allowed order statuses
const ALLOWED_STATUSES = ["received", "preparing", "delivering", "delivered"];

/**
 * CREATE
 * POST /api/orders  → create new order
 */
router.post("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, total, status } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    const numericTotal = Number(total);
    if (!Number.isFinite(numericTotal) || numericTotal <= 0) {
      return res
        .status(400)
        .json({ message: "Total must be a positive number" });
    }

    // default status if not provided
    const orderStatus = status || "received";

    // validate status if provided
    if (!ALLOWED_STATUSES.includes(orderStatus)) {
      return res.status(400).json({
        message: "Invalid status value",
        allowedStatuses: ALLOWED_STATUSES,
      });
    }

    const [result] = await pool.query(
      "INSERT INTO orders (user_id, items, total, status) VALUES (?, ?, ?, ?)",
      [userId, JSON.stringify(items), numericTotal, orderStatus]
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

/**
 * READ (all for current user)
 * GET /api/orders  → list all orders for current user
 */
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

/**
 * READ (single)
 * GET /api/orders/:id  → get single order by id (only if it belongs to user)
 */
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

/**
 * UPDATE (status)
 * PUT /api/orders/:id  → update status manually (e.g. 'preparing', 'delivering')
 */
router.put("/:id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        allowedStatuses: ALLOWED_STATUSES,
      });
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

/**
 * UPDATE (next step)
 * OPTIONAL: PUT /api/orders/:id/next  → move to next status step
 */
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
    const currentIndex = ALLOWED_STATUSES.indexOf(currentStatus);

    if (currentIndex === -1 || currentIndex === ALLOWED_STATUSES.length - 1) {
      return res.json({
        message: "Order is already at final status",
        status: currentStatus,
      });
    }

    const nextStatus = ALLOWED_STATUSES[currentIndex + 1];

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

/**
 * DELETE
 * DELETE /api/orders/:id  → delete order
 */
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
