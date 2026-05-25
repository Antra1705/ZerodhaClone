import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mk-footer">
      <div className="mk-footer-grid">
        <div className="mk-footer-brand">
          <Link to="/" className="mk-logo">
            <span className="mk-logo-mark">TD</span>
            <span className="mk-logo-text">TradeDash</span>
          </Link>
          <p>
            Professional US equity trading terminal.
            <br />
            © {new Date().getFullYear()} TradeDash Technologies Inc.
          </p>
        </div>
        <div className="mk-footer-col">
          <h4>Platform</h4>
          <Link to="/product">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="mk-footer-col">
          <h4>Support</h4>
          <Link to="/support">Help center</Link>
          <a href="mailto:support@tradedash.com">Contact</a>
        </div>
        <div className="mk-footer-col">
          <h4>Account</h4>
          <Link to="/signup">Open account</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/dashboard">Terminal</Link>
        </div>
      </div>
      <div className="mk-footer-legal">
        <p>
          TradeDash Technologies Inc. · Securities offered through registered US broker-dealer partners.
          Investing involves risk, including loss of principal. Past performance does not guarantee future results.
        </p>
        <p>
          Market data delayed or simulated where noted. Not investment advice. Read disclosures before trading.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
