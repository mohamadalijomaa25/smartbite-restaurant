import React from "react";
import { useNavigate } from "react-router-dom";
import menuItems from "../data/menuItems";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";

const MenuPage = () => {
  const { addToCart, placeOrder } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const orderId = placeOrder();
    if (orderId) {
      navigate(`/order/${orderId}`);
    } else {
      alert("Your cart is empty.");
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

        
        <div className="col-lg-8">
          <div className="menu-scroll">
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
                              <span className="fw-bold">${item.price.toFixed(2)}</span>
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
        </div>

        
        <div className="col-lg-4">

          
          <div className="cart-scroll d-none d-lg-block">
            <CartSummary onPlaceOrder={handlePlaceOrder} />
          </div>

          
          <div className="d-lg-none mt-4">
            <CartSummary onPlaceOrder={handlePlaceOrder} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default MenuPage;
