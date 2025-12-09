import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const OrderTracking = () => {
  const { orderId } = useParams();
  const { token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const steps = [
    { key: "received", label: "Order received" },
    { key: "preparing", label: "Preparing your food" },
    { key: "delivering", label: "Out for delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  useEffect(() => {
    // if user is not logged in, redirect to login
    if (!isLoggedIn || !token) {
      setError("You must log in to view your order.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.message || "Could not load this order.");
        }

        setOrder(data);
      } catch (err) {
        console.error("Error loading order:", err);
        setError(err.message || "Error loading order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token, isLoggedIn]);

  // Determine active step index based on order.status
  let activeIndex = 0;
  if (order && order.status) {
    const statusOrder = ["received", "preparing", "delivering", "delivered"];
    const idx = statusOrder.indexOf(order.status);
    activeIndex = idx >= 0 ? idx : 0;
  }

  // Parse items from JSON field
  let parsedItems = [];
  if (order && order.items) {
    try {
      if (Array.isArray(order.items)) {
        parsedItems = order.items;
      } else if (typeof order.items === "string") {
        parsedItems = JSON.parse(order.items);
      } else {
        parsedItems = [];
      }
    } catch (e) {
      console.warn("Could not parse order items JSON", e);
      parsedItems = [];
    }
  }

  const total =
    order && order.total
      ? typeof order.total === "number"
        ? order.total
        : parseFloat(order.total)
      : 0;

  if (loading) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Order #{orderId}</h1>
        <p>Loading your order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Order #{orderId}</h1>
        <p className="text-danger mb-3">{error}</p>

        {!isLoggedIn && (
          <button
            className="btn btn-dark me-2"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        )}

        <Link className="btn btn-outline-dark" to="/menu">
          Back to menu
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Order #{orderId}</h1>
        <p className="text-muted">
          We couldn't find this order. It may not belong to your account.
        </p>
        <Link className="btn btn-dark" to="/menu">
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-3">Order #{order.id}</h1>
      <p className="text-muted">
        Thank you! Your order was created on{" "}
        {new Date(order.created_at || order.createdAt).toLocaleString()}.
      </p>

      {/* STATUS STEPS */}
      <div className="mb-4">
        <h5 className="mb-3">Order status</h5>
        <div className="d-flex flex-column flex-md-row">
          {steps.map((step, index) => {
            const isActive = index <= activeIndex;
            return (
              <div
                key={step.key}
                className="d-flex align-items-center mb-3 mb-md-0 flex-fill"
              >
                <div
                  className={
                    "rounded-circle border d-flex align-items-center justify-content-center me-2"
                  }
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: isActive ? "#000" : "#fff",
                    color: isActive ? "#fff" : "#000",
                  }}
                >
                  {index + 1}
                </div>
                <span className={isActive ? "fw-semibold" : "text-muted"}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="flex-fill d-none d-md-block mx-2 border-top" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Order summary</h5>

          {parsedItems.length === 0 && (
            <p className="text-muted small mb-0">
              No item details available for this order.
            </p>
          )}

          {parsedItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="d-flex justify-content-between small mb-2"
            >
              <span>
                {item.name} x {item.quantity || item.qty || 1}
              </span>
              <span>
                $
                {((item.price || 0) * (item.quantity || item.qty || 1)).toFixed(
                  2
                )}
              </span>
            </div>
          ))}

          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <Link className="btn btn-dark" to="/menu">
        Back to menu
      </Link>
    </div>
  );
};

export default OrderTracking;
