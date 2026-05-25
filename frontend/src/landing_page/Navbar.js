import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="mk-nav">
      <div className="mk-nav-inner">
        <Link to="/" className="mk-logo">
          <span className="mk-logo-mark">TD</span>
          <span className="mk-logo-text">TradeDash</span>
          <span className="mk-logo-tag">TERMINAL</span>
        </Link>

        <ul className="mk-nav-links">
          <li>
            <NavLink to="/product">Platform</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/support">Support</NavLink>
          </li>
        </ul>

        <div className="mk-nav-cta">
          <Link to="/login" className="mk-btn mk-btn-ghost">
            Sign in
          </Link>
          <Link to="/signup" className="mk-btn mk-btn-primary">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
