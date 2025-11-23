import React from "react";

const About = () => {
  return (
    <main>
      
      <section className="py-5 bg-light border-bottom">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="display-5 fw-bold mb-3">About SmartBite</h1>
              <p className="lead text-muted mb-3">
                SmartBite is a simple restaurant ordering system designed to
                make it easy for customers in Baalbek to browse the menu, build
                their order, and track it from preparation to delivery.
              </p>
              <p className="text-muted mb-0">
                This project was built as a modern React web application, with a
                focus on clean UI, responsive design, and a smooth ordering
                experience.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Quick Facts</h5>
                  <ul className="list-unstyled mb-0 small">
                    <li className="mb-2">
                      ✅ Built with <strong>React</strong> &amp;{" "}
                      <strong>React Router</strong>
                    </li>
                    <li className="mb-2">
                      ✅ Styled using <strong>Bootstrap</strong> and custom CSS
                    </li>
                    <li className="mb-2">
                      ✅ Fully responsive on desktop &amp; mobile
                    </li>
                    <li>
                      ✅ Features menu browsing, cart, and order tracking flow
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <h2 className="h3 fw-bold mb-3">Our Mission</h2>
              <p className="text-muted mb-3">
                SmartBite was created to simulate a real restaurant ordering
                experience: customers can explore categories, add items to their
                cart, and place an order that can then be tracked through
                multiple stages.
              </p>
              <p className="text-muted mb-3">
                The goal of this project is not only to provide a nice user
                interface, but also to demonstrate core web development
                concepts: routing, state management with React context, and
                component-based UI design.
              </p>
              <p className="text-muted mb-0">
                While this is a frontend-only demo (no real backend or payment
                system), the structure is similar to real-world food delivery
                apps and can be extended in the future.
              </p>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div
                  style={{
                    backgroundImage: "url('/images/background.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "220px",
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="fw-semibold mb-2">Designed for the user</h5>
                  <p className="small text-muted mb-0">
                    From the homepage hero section to the order tracking page,
                    every screen is designed to be clear, simple, and
                    mobile-friendly for a better user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-5 bg-light border-top">
        <div className="container">
          <h2 className="h3 fw-bold mb-4 text-center">
            What you can do with SmartBite
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="h-100 p-4 bg-white rounded-4 shadow-sm text-center">
                <h5 className="fw-semibold mb-2">Browse the menu</h5>
                <p className="text-muted small mb-0">
                  Explore different categories like mains, starters, desserts,
                  and drinks. Each item shows an image, description, and price.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 p-4 bg-white rounded-4 shadow-sm text-center">
                <h5 className="fw-semibold mb-2">Manage your cart</h5>
                <p className="text-muted small mb-0">
                  Add items, change quantities, remove items, and always see the
                  updated total before placing your order.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 p-4 bg-white rounded-4 shadow-sm text-center">
                <h5 className="fw-semibold mb-2">Track your order</h5>
                <p className="text-muted small mb-0">
                  After placing an order, you are redirected to a tracking page
                  where you can see the order summary and status steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-5">
        <div className="container">
          <h2 className="h4 fw-bold mb-4 text-center">Technologies used</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded-4 text-center h-100">
                <h6 className="fw-semibold mb-1">ReactJS</h6>
                <p className="text-muted small mb-0">
                  Component-based UI and SPA routing.
                </p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded-4 text-center h-100">
                <h6 className="fw-semibold mb-1">React Router</h6>
                <p className="text-muted small mb-0">
                  Handles navigation between pages (Home, Menu, About, etc.).
                </p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded-4 text-center h-100">
                <h6 className="fw-semibold mb-1">Bootstrap</h6>
                <p className="text-muted small mb-0">
                  Provides responsive grid and prebuilt components.
                </p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded-4 text-center h-100">
                <h6 className="fw-semibold mb-1">Context API</h6>
                <p className="text-muted small mb-0">
                  Manages cart and orders across pages without props drilling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
