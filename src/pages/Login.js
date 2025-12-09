import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      login(data.user, data.token);
      navigate("/menu"); // go to menu after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Login</h1>
      <div className="row">
        <div className="col-md-6">
          <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-danger small mb-2">{error}</p>}

            <button type="submit" className="btn btn-dark">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
