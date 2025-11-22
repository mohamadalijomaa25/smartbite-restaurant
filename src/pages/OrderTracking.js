import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderTracking = () => {
  const { orderId } = useParams();
  const { getOrderById } = useCart();

  const order = getOrderById(orderId);

  const steps = [
    { key: "received", label: "Order received" },
    { key: "preparing", label: "Preparing your food" },
    { key: "on-the-way", label: "Out for delivery" },
    { key: "completed", label: "Delivered" }
  ];

  if (!order) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Order #{orderId}</h1>
        <p className="text-muted">
          We couldn't find this order in the current session. Remember that this
          is a frontend-only demo, so order data is not persisted after
          refreshing the page.
        </p>
        <Link className="btn btn-dark" to="/menu">
          Place a new order
        </Link>
      </div>
    );
  }

  // Simple demo: always show it as "preparing"
  const activeIndex = 1;

  return (
    <div className="container py-5">
      <h1 className="mb-3">Order #{order.id}</h1>
      <p className="text-muted">
        Thank you! Your order was received on{" "}
        {new Date(order.createdAt).toLocaleString()}.
      </p>

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
                    color: isActive ? "#fff" : "#000"
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

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Order summary</h5>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between small mb-2"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>${order.total.toFixed(2)}</strong>
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
