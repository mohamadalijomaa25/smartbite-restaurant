import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api";

const statusMeta = {
  received: { label: "Received", badge: "bg-secondary" },
  preparing: { label: "Preparing", badge: "bg-warning text-dark" },
  delivering: { label: "Delivering", badge: "bg-info text-dark" },
  delivered: { label: "Delivered", badge: "bg-success" },
};

function safeParseItems(items) {
  if (!items) return [];
  try {
    if (Array.isArray(items)) return items;
    if (typeof items === "string") {
      const parsed = JSON.parse(items);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch {
    return [];
  }
}

export default function MyOrders() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ NEW: cancel/delete order (owner only)
  const handleCancel = async (orderId) => {
    const ok = window.confirm("Cancel this order? This will delete it.");
    if (!ok) return;

    try {
      await apiRequest(`/api/orders/${orderId}`, { method: "DELETE" });
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (e) {
      alert(e.message || "Failed to cancel order");
    }
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        setError("You must log in to view your orders.");
        return;
      }

      try {
        setLoading(true);
        setError("");
        const data = await apiRequest("/api/orders");
        if (!cancelled) setOrders(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load orders.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return (orders || []).filter((o) => {
      const statusOk = statusFilter === "all" ? true : o.status === statusFilter;
      const searchOk = !s ? true : String(o.id).toLowerCase().includes(s);
      return statusOk && searchOk;
    });
  }, [orders, statusFilter, search]);

  if (loading) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">My Orders</h1>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">My Orders</h1>
        <p className="text-danger mb-3">{error}</p>
        {!isLoggedIn ? (
          <button className="btn btn-dark" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        ) : (
          <button
            className="btn btn-outline-dark"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
        <div>
          <h1 className="mb-1">My Orders</h1>
          <p className="text-muted mb-0">
            Track your recent orders and their status.
          </p>
        </div>
        <button className="btn btn-dark" onClick={() => navigate("/menu")}>
          New Order
        </button>
      </div>

      {/* Filters */}
      <div className="row g-2 mb-4">
        <div className="col-12 col-md-4">
          <label className="form-label small text-muted mb-1">Status</label>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="received">Received</option>
            <option value="preparing">Preparing</option>
            <option value="delivering">Delivering</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div className="col-12 col-md-8">
          <label className="form-label small text-muted mb-1">Search</label>
          <input
            className="form-control"
            placeholder="Search by order # (example: 12)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border rounded-3 p-4">
          <p className="mb-3">No orders found.</p>
          <Link className="btn btn-dark" to="/menu">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map((order) => {
            const items = safeParseItems(order.items);
            const itemsCount = items.reduce(
              (sum, it) => sum + Number(it.quantity || it.qty || 1),
              0
            );

            const total = Number(order.total ?? 0);
            const meta = statusMeta[order.status] || {
              label: order.status || "Unknown",
              badge: "bg-secondary",
            };
            const created = order.created_at || order.createdAt;

            return (
              <div className="col-12" key={order.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <h5 className="mb-0">Order #{order.id}</h5>
                          <span className={`badge ${meta.badge}`}>
                            {meta.label}
                          </span>
                        </div>
                        <div className="text-muted small">
                          {created ? new Date(created).toLocaleString() : ""}
                        </div>
                        <div className="small mt-2">
                          <span className="me-3">
                            <strong>{itemsCount}</strong> item(s)
                          </span>
                          <span>
                            Total: <strong>${total.toFixed(2)}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-start align-items-md-center gap-2">
                        <Link className="btn btn-dark" to={`/order/${order.id}`}>
                          Track
                        </Link>

                        {/* ✅ NEW: Cancel button (hide if delivered) */}
                        {order.status !== "delivered" && (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleCancel(order.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
