import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <Link to="/" className="logo">
        StayConnected
      </Link>
      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`fa ${!menuOpen ? "fa-bars" : "fa-close"}`}></i>
      </div>
      <div className={`header-links ${!menuOpen ? "closed" : ""}`}>
        <Link
          className="header-link"
          to="/category/india"
          onClick={() => setMenuOpen(false)}
        >
          India
        </Link>
        <Link
          className="header-link"
          to="/category/world"
          onClick={() => setMenuOpen(false)}
        >
          World
        </Link>
        <Link
          className="header-link"
          to="/category/technology"
          onClick={() => setMenuOpen(false)}
        >
          Tech
        </Link>
        <Link
          className="header-link"
          to="/category/sports"
          onClick={() => setMenuOpen(false)}
        >
          Sports
        </Link>
        {currentUser && (
          <Link
            className="header-link"
            to="/write"
            onClick={() => setMenuOpen(false)}
            state={null}
          >
            <b>Write</b>
          </Link>
        )}
        {!currentUser && (
          <Link
            className="header-link user-action-link"
            to={`/login`}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
        {currentUser && (
          <div
            className="header-link user-action-link"
            onClick={async () => {
              await logout();
              setMenuOpen(false);
            }}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
