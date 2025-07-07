import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <p>
        Copyright &copy; {new Date().getFullYear()} StayConnected - The News
        App. All Rights Reserved.
      </p>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}

export default Footer;
