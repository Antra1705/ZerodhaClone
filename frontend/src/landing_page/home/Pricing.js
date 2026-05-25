import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section className="mk-section" style={{ paddingTop: 0 }}>
      <div className="mk-section-header">
        <h2>Transparent US equity pricing</h2>
        <p>Simple, published rates. No hidden “plan tiers” or surprise statement lines.</p>
      </div>
      <div className="mk-pricing-cards">
        <div className="mk-price-card glass">
          <h3>Equity delivery</h3>
          <div className="amount">
            $0<span>/trade</span>
          </div>
          <p>Unlimited buy &amp; hold. No platform fee on settled positions.</p>
        </div>
        <div className="mk-price-card glass featured">
          <h3>Active trading</h3>
          <div className="amount">
            $0.50<span>/contract</span>
          </div>
          <p>Options &amp; intraday equities. Capped per order, never scaled by AUM.</p>
        </div>
        <div className="mk-price-card glass">
          <h3>Data &amp; terminal</h3>
          <div className="amount">
            $0<span>/mo</span>
          </div>
          <p>Real-time watchlist, charts, and order ticket included with account.</p>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: 32 }}>
        <Link to="/pricing" className="mk-btn mk-btn-ghost">
          Full fee schedule →
        </Link>
      </p>
    </section>
  );
}

export default Pricing;
