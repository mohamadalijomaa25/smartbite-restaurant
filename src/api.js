// src/api.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("API error:", res.status, data);
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (err) {
    console.error("Network or fetch error:", err);
    throw err;
  }
}
