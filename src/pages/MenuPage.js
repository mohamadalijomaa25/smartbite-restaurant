import React from "react";
import { useNavigate } from "react-router-dom";
import menuItems from "../data/menuItems";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartSummary from "../components/CartSummary";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const MenuPage = () => {
  const { addToCart, placeOrder, cartItems, cartTotal } = useCart();
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    // 1) If user is not logged in → redirect to login
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
      // 2) Send order to backend (Node.js + MySQL)
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
        // ignore if no JSON body
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order on server");
      }

      console.log("Backend order created:", data);

      // 3) Also place order in frontend context (for existing tracking UI)
      const orderId = placeOrder();
      if (orderId) {
        navigate(`/order/${orderId}`);
      } else {
        alert("Order saved on server, but there was an issue with local tracking.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("There was a problem placing your order. Please try again.");
    }
  };

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-0">Menu</h1>
          <p className="text-muted mb-0">
            Choose your favorite dishes and add them to your cart.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* LEFT COLUMN – MENU ITEMS */}
        <div className="col-lg-8 menu-scroll">
          {categories.map((category) => (
            <div key={category} className="mb-4">
              <h3 className="h5 mb-3">{category}</h3>
              <div className="row g-3">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div className="col-md-6" key={item.id}>
                      <div className="card h-100 shadow-sm">
                        {item.image && (
                          <img
                            src={item.image}
                            className="card-img-top"
                            alt={item.name}
                            style={{ height: "180px", objectFit: "cover" }}
                          />
                        )}
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text text-muted small flex-grow-1">
                            {item.description}
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">
                              ${item.price.toFixed(2)}
                            </span>
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() => addToCart(item)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN – CART SUMMARY */}
        <div className="col-lg-4 cart-scroll">
          <div style={{ position: "sticky", top: "100px" }}>
            <CartSummary onPlaceOrder={handlePlaceOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
