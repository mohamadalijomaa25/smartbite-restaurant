import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems, clearCart } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          SmartBite
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/menu">
                Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right side: auth + cart */}
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <span className="me-2 small text-muted">
                  Hi, {user?.name || "Guest"}
                </span>
                <button
                  className="btn btn-outline-dark btn-sm me-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-dark btn-sm me-2"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-dark btn-sm me-2"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* UPDATED → directs to /cart */}
            <Link to="/cart" className="btn btn-dark">
              Cart ({itemCount})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
