import React from "react";
import { useCart } from "../context/CartContext";

const CartSummary = ({ onPlaceOrder }) => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Your Cart</h5>
          <p className="text-muted mb-0">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Your Cart</h5>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between align-items-center mb-2"
          >
            <div className="me-2">
              <strong>{item.name}</strong>
              <div className="small text-muted">
                ${item.price.toFixed(2)} x{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="form-control d-inline-block"
                  style={{ width: "70px" }}
                />
              </div>
            </div>
            <div>
              <span className="me-2">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeFromCart(item.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <strong>Total:</strong>
          <strong>${cartTotal.toFixed(2)}</strong>
        </div>
        <button
          className="btn btn-dark w-100 mt-3"
          onClick={onPlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
