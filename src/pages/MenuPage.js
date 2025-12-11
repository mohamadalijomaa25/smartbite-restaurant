import React from "react";
import menuItems from "../data/menuItems";
import { useCart } from "../context/CartContext";

const MenuPage = () => {
  const { addToCart } = useCart();

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

      {/* Single-column layout – only menu items here */}
      <div className="row g-4">
        <div className="col-12">
          {categories.map((category) => (
            <div key={category} className="mb-4">
              <h3 className="h5 mb-3">{category}</h3>
              <div className="row g-3">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div className="col-md-6 col-lg-4" key={item.id}>
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
      </div>
    </div>
  );
};

export default MenuPage;
