import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menuItems from "../data/menuItems";

const Home = () => {
  // Pick some items for the "Best Seller" slideshow (any with an image)
  const bestSellerItems = menuItems.filter((item) => item.image);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    if (bestSellerItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bestSellerItems.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, [bestSellerItems.length]);

  // 🖼️ Preload all images to avoid delay when switching
  useEffect(() => {
    bestSellerItems.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, [bestSellerItems]);

  const currentItem =
    bestSellerItems.length > 0 ? bestSellerItems[currentIndex] : null;

  return (
    <main>
      {/* HERO: SmartBite / McDonald's-style banner */}
      <section
        className="py-5"
        style={{ backgroundColor: "#ffffffff" }} // softer background
      >
        <div className="container">
          <div className="row align-items-center g-4">
            {/* LEFT: text */}
            <div className="col-lg-6">
              <span
                className="badge rounded-pill mb-3"
                style={{ backgroundColor: "#e53935", color: "#fff" }}
              >
                New • SmartBite Deals
              </span>

              <h1 className="display-4 fw-bold mb-3">
                Craving something{" "}
                <span style={{ color: "#e53935" }}>delicious?</span>
              </h1>

              <p className="lead text-dark mb-4">
                Order your favorite burgers, fries, and drinks from SmartBite
                and get them delivered hot and fresh in Baalbek.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to="/menu" className="btn btn-dark btn-lg px-4">
                  Order Now
                </Link>
                <Link to="/about" className="btn btn-outline-dark btn-lg px-4">
                  About SmartBite
                </Link>
              </div>

              <p className="small text-muted mt-3 mb-0">
                Open every day • Fast delivery • Fresh ingredients
              </p>
            </div>

            {/* RIGHT: Best Seller slideshow */}
            <div className="col-lg-6">
              <div
                className="card border-0 shadow-lg rounded-4 overflow-hidden"
                style={{ maxWidth: "460px", marginLeft: "auto" }}
              >
                <div style={{ position: "relative" }}>
                  {currentItem && (
                    <img
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "260px",
                        objectFit: "cover",
                        // removed transition to avoid visible delay vs text
                      }}
                    />
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-semibold mb-1">
                    {currentItem ? currentItem.name : "SmartBite Classic Meal"}
                  </h5>
                  <p className="card-text small text-muted mb-2">
                    {currentItem
                      ? `${currentItem.category} • SmartBite Special`
                      : "Burger • Fries • Drink"}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold" style={{ color: "#e53935" }}>
                      {currentItem
                        ? `$${currentItem.price.toFixed(2)}`
                        : "$9.99"}
                    </span>
                    <Link to="/menu" className="btn btn-sm btn-dark">
                      Jump to Menu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DEALS */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 fw-bold mb-4 text-center">Featured Deals</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Burger &amp; Fries</h5>
                  <p className="card-text text-muted small">
                    A classic combo to satisfy your hunger at any time of the
                    day.
                  </p>
                  <span
                    className="badge"
                    style={{ backgroundColor: "#e53935", color: "#fff" }}
                  >
                    Popular
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Family Box</h5>
                  <p className="card-text text-muted small">
                    Share your favorite meals with friends and family.
                  </p>
                  <span
                    className="badge"
                    style={{ backgroundColor: "#ff7043", color: "#fff" }}
                  >
                    For Sharing
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Late Night Snacks</h5>
                  <p className="card-text text-muted small">
                    Open late so you can always grab something tasty.
                  </p>
                  <span
                    className="badge"
                    style={{ backgroundColor: "#fbc02d", color: "#000" }}
                  >
                    Until Midnight
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-5">
        <div className="container">
          <h2 className="h3 fw-bold mb-4 text-center">How it works</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-3">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#ffe082",
                    color: "#e53935",
                    fontWeight: "700",
                  }}
                >
                  1
                </div>
                <h6 className="fw-semibold">Browse the Menu</h6>
                <p className="text-muted small mb-0">
                  Explore burgers, sides, drinks, and desserts.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#ffe082",
                    color: "#e53935",
                    fontWeight: "700",
                  }}
                >
                  2
                </div>
                <h6 className="fw-semibold">Add to Cart</h6>
                <p className="text-muted small mb-0">
                  Customize quantities and review your order.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#ffe082",
                    color: "#e53935",
                    fontWeight: "700",
                  }}
                >
                  3
                </div>
                <h6 className="fw-semibold">Track Your Order</h6>
                <p className="text-muted small mb-0">
                  Follow your order status from received to delivered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
