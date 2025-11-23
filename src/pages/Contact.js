import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setSubmitted(true);
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

            <button className="btn btn-dark" type="submit">
              Send
            </button>

            {submitted && (
              <p className="text-success small mt-3">
                Thank you! We received your message.
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
              
              <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Baalbek%2C%20Lebanon&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Map - Baalbek"
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
