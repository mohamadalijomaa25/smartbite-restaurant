import React from "react";

const About = () => {
  return (
    <div className="container py-5">
      {/* TITLE */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <h1 className="mb-3">About SmartBite</h1>
          <p className="text-muted">
            SmartBite is a full-stack restaurant ordering system built as a
            university project. It allows customers to browse the menu, add
            items to a cart, place orders, and track their order status in
            real time using a Node.js backend and MySQL database.
          </p>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="row g-4">
        {/* Project Goal */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-2">Project Idea & Goal</h5>
              <p className="text-muted small mb-0">
                The main idea of SmartBite is to simulate a modern online
                ordering experience for a restaurant in Baalbek. The system
                covers the full journey: from browsing the menu, to adding
                items to the cart, to placing an order and tracking its status
                (received, preparing, delivering, delivered).
              </p>
            </div>
          </div>
        </div>

        {/* Frontend */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-2">Frontend (React)</h5>
              <p className="text-muted small">
                The frontend is built with <strong>React</strong> and styled
                using <strong>Bootstrap 5</strong> plus custom CSS.
              </p>
              <ul className="text-muted small mb-0">
                <li>Responsive layout for desktop and mobile</li>
                <li>Menu page with categories and images</li>
                <li>Cart with quantities and live total</li>
                <li>Order tracking page with step-by-step status</li>
                <li>Client-side routing using React Router</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Backend */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-2">Backend (Node.js &amp; MySQL)</h5>
              <p className="text-muted small">
                The backend is implemented using <strong>Node.js</strong> with{" "}
                <strong>Express</strong> and a <strong>MySQL</strong> database.
                It exposes a REST API that the React app uses to store and
                retrieve data.
              </p>
              <ul className="text-muted small mb-0">
                <li>User registration and login with hashed passwords</li>
                <li>JWT-based authentication for protected routes</li>
                <li>Orders stored in a real MySQL database</li>
                <li>CRUD operations on orders (create, read, update, delete)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Users & Features */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-2">Users &amp; Features</h5>
              <ul className="text-muted small mb-2">
                <li>Customers can sign up, log in, and place orders</li>
                <li>Each order is linked to the logged-in user</li>
                <li>Order status can be updated on the backend</li>
                <li>Tracking page reads the latest status from the server</li>
              </ul>
              <p className="text-muted small mb-0">
                This combination of frontend and backend features demonstrates a
                complete client-server architecture with authentication and
                persistent data storage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack summary */}
      <div className="row mt-5">
        <div className="col-lg-8">
          <h5 className="fw-semibold mb-2">Technology Stack</h5>
          <p className="text-muted small mb-1">
            <strong>Frontend:</strong> React, React Router, Bootstrap 5, custom CSS
          </p>
          <p className="text-muted small mb-1">
            <strong>Backend:</strong> Node.js, Express, JSON Web Tokens (JWT)
          </p>
          <p className="text-muted small mb-1">
            <strong>Database:</strong> MySQL (Users &amp; Orders tables)
          </p>
          <p className="text-muted small mb-0">
            <strong>Tools:</strong> VS Code, XAMPP (MySQL), Git, GitHub, Netlify, Render/Railway (for deployment)
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
