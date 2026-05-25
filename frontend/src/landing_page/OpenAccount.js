import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <section className="mk-cta">
      <h2>Ready to run your desk on TradeDash?</h2>
      <p>
        Create an account in under two minutes. Your terminal is one login away.
      </p>
      <Link to="/signup" className="mk-btn mk-btn-primary">
        Get terminal access
      </Link>
    </section>
  );
}

export default OpenAccount;
