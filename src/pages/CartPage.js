// src/pages/CartPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const CartPage = () => {
  const {
    cartItems,
    cartTotal,
    clearCart,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      alert("You must log in before placing an order.");
      navigate("/login");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          total: cartTotal,
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        // ignore if no JSON
      }

      if (!res.ok) {
        console.error("Backend error response:", res.status, data);
        throw new Error(
          data.message || `Failed to place order (status ${res.status})`
        );
      }

      const orderId = data.orderId || data.id;
      if (!orderId) {
        throw new Error(
          "Order was created on the server but no order ID was returned."
        );
      }

      clearCart();
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.error("Error placing order:", err);
      alert(
        err.message ||
          "There was a problem placing your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-3">Your Cart</h1>
      <p className="text-muted mb-4">
        Review your items and place your order when you’re ready.
      </p>

      {(!cartItems || cartItems.length === 0) && (
        <div className="border rounded-3 p-4">
          <p className="mb-3">Your cart is currently empty.</p>
          <button
            className="btn btn-dark"
            type="button"
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </button>
        </div>
      )}

      {cartItems && cartItems.length > 0 && (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="border rounded-3 p-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center justify-content-between py-2 border-bottom"
                >
                  <div>
                    <div className="fw-semibold">{item.name}</div>
                    <small className="text-muted">
                      ${Number(item.price ?? 0).toFixed(2)}
                    </small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity ?? 1}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value || 1))
                      }
                      className="form-control form-control-sm"
                      style={{ width: "70px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="border rounded-3 p-3">
              <h5 className="mb-3">Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>${Number(cartTotal ?? 0).toFixed(2)}</strong>
              </div>
              <button
                type="button"
                className="btn btn-dark w-100"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
