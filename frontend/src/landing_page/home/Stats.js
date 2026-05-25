import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <section className="mk-section">
      <div className="mk-stats-grid">
        <div className="mk-stat-list">
          <div className="mk-stat-item">
            <h3>Built for professionals, not tourists</h3>
            <p>
              No gamification, no confetti on fills, no social feed. TradeDash is a
              workstation — the same mental model as Bloomberg, with the polish of
              modern product design.
            </p>
          </div>
          <div className="mk-stat-item">
            <h3>One session, entire platform</h3>
            <p>
              Land on the homepage, authenticate, and land in your terminal without
              changing ports or domains. Single SPA, single origin, single trust boundary.
            </p>
          </div>
          <div className="mk-stat-item">
            <h3>Resilient by default</h3>
            <p>
              Exponential backoff on upstream feeds, chart cache TTL, and graceful
              empty states when symbols fail — because uptime is a feature.
            </p>
          </div>
          <Link to="/product" className="mk-btn mk-btn-ghost" style={{ width: "fit-content", marginLeft: 13 }}>
            Explore the stack →
          </Link>
        </div>
        <div className="mk-trust-panel glass">
          <div className="mk-trust-metrics">
            <div className="mk-trust-metric">
              <strong>2M+</strong>
              <span>Daily tick events relayed</span>
            </div>
            <div className="mk-trust-metric">
              <strong>99.9%</strong>
              <span>API availability target</span>
            </div>
            <div className="mk-trust-metric">
              <strong>$0</strong>
              <span>Platform access fee</span>
            </div>
            <div className="mk-trust-metric">
              <strong>0.5¢</strong>
              <span>Per-share commission cap</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
