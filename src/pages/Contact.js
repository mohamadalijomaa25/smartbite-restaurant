import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSubmitted(false);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Contact Us</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card shadow-sm p-4">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
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
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-dark" type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send"}
            </button>

            {submitted && (
              <p className="text-success small mt-3">
                Thank you! Your message has been sent.
              </p>
            )}

            {error && (
              <p className="text-danger small mt-3">
                {error}
              </p>
            )}
          </form>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">
            <h5>Restaurant Info</h5>
            <p className="mb-1">SmartBite Restaurant</p>
            <p className="mb-1">Food Street, Baalbek</p>
            <p className="mb-1">Phone: +961 81 44 00 46</p>
            <p>Email: 82230445@students.liu.edu.lb</p>
            <hr />
            <h6>Opening Hours</h6>
            <p className="mb-1">Mon - Fri: 11:00 - 23:00</p>
            <p>Sat - Sun: 12:00 - 00:00</p>
            <div className="mt-3">
              <div className="ratio ratio-16x9 bg-light rounded-3">
                <iframe
                  title="SmartBite location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3351.1647268615556!2d36.209!3d34.005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1522066b7c0f0001%3A0x1!2sBaalbek!5e0!3m2!1sen!2slb!4v1700000000000"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
