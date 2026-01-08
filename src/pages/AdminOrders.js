import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api";

const STATUSES = ["received", "preparing", "delivering", "delivered"];

function safeParseItems(items) {
  if (!items) return [];
  try {
    if (Array.isArray(items)) return items;
    if (typeof items === "string") return JSON.parse(items) || [];
    return [];
  } catch {
    return [];
  }
}

export default function AdminOrders() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiRequest("/api/admin/orders");
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load admin orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    if (user?.role !== "admin") return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, user?.role]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return orders;
    return orders.filter((o) => {
      return (
        String(o.id).includes(s) ||
        String(o.user_email || "").toLowerCase().includes(s) ||
        String(o.user_name || "").toLowerCase().includes(s)
      );
    });
  }, [orders, search]);

  const updateStatus = async (orderId, status) => {
    try {
      await apiRequest(`/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    } catch (e) {
      alert(e.message || "Failed to update status");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Admin Orders</h1>
        <p className="text-danger">You must log in.</p>
        <button className="btn btn-dark" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Admin Orders</h1>
        <p className="text-danger">Forbidden: Admin only.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Admin Orders</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Admin Orders</h1>
        <p className="text-danger">{error}</p>
        <button className="btn btn-outline-dark" onClick={load}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <div>
          <h1 className="mb-1">Admin Orders</h1>
          <p className="text-muted mb-0">Manage and update order statuses.</p>
        </div>
        <button className="btn btn-outline-dark" onClick={load}>
          Refresh
        </button>
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search by order #, customer name, or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p>No orders.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Items</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => {
                const items = safeParseItems(o.items);
                const count = items.reduce(
                  (sum, it) => sum + Number(it.quantity || it.qty || 1),
                  0
                );

                return (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>
                      <div className="fw-semibold">{o.user_name}</div>
                      <div className="small text-muted">{o.user_email}</div>
                    </td>
                    <td>${Number(o.total || 0).toFixed(2)}</td>
                    <td>{count}</td>
                    <td style={{ minWidth: 180 }}>
                      <select
                        className="form-select"
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={() => navigate(`/order/${o.id}`)}
                      >
                        Track
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
