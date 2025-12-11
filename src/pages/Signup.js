import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      // Auto-login after signup
      login(data.user, data.token);
      setSuccess("Account created successfully!");
      navigate("/menu");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="auth-card shadow-lg">
              <div className="text-center mb-4">
                <h1 className="h3 fw-bold mb-1">Create your account 🍔</h1>
                <p className="text-muted small mb-0">
                  Join SmartBite and start ordering your favorite meals.
                </p>
              </div>

              {error && (
                <p className="text-danger small mb-3 text-center">{error}</p>
              )}
              {success && (
                <p className="text-success small mb-3 text-center">{success}</p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Name</label>
                  <input
                    name="name"
                    className="form-control auth-input"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control auth-input"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control auth-input"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a strong password"
                  />
                </div>

                <button
                  className="btn btn-dark w-100 mb-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>
              </form>

              <p className="text-center small text-muted mb-0">
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
