import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import MenuPage from "./pages/MenuPage";
import Contact from "./pages/Contact";
import OrderTracking from "./pages/OrderTracking";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Scroll reset on route change */}
      <ScrollToTop />

      <Navbar />

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order/:orderId" element={<OrderTracking />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
