import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container text-center small">
        &copy; {new Date().getFullYear()} SmartBite Restaurant. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
