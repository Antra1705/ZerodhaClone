import React from "react";
import { Link } from "react-router-dom";
import TerminalPreview from "./TerminalPreview";

function Hero() {
  return (
    <section className="mk-hero">
      <div className="mk-hero-glow mk-hero-glow-1" />
      <div className="mk-hero-glow mk-hero-glow-2" />
      <div className="mk-hero-grid">
        <div>
          <div className="mk-hero-eyebrow">
            <span className="pulse-dot" />
            Real-time US equities
          </div>
          <h1>
            The terminal built for
            <br />
            <span className="accent">serious traders</span>
          </h1>
          <p className="mk-hero-lead">
            TradeDash is a professional-grade trading workspace — live tick streams,
            institutional charts, and smart order routing in one seamless session.
            Not another broker clone. Your edge, your interface.
          </p>
          <div className="mk-hero-actions">
            <Link to="/signup" className="mk-btn mk-btn-primary">
              Open terminal access
            </Link>
            <Link to="/login" className="mk-btn mk-btn-ghost">
              Sign in
            </Link>
          </div>
          <div className="mk-hero-stats">
            <div className="mk-hero-stat">
              <strong className="mono">&lt;12ms</strong>
              <span>Tick relay latency</span>
            </div>
            <div className="mk-hero-stat">
              <strong className="mono">6</strong>
              <span>US mega-cap feeds</span>
            </div>
            <div className="mk-hero-stat">
              <strong className="mono">24/7</strong>
              <span>Cloud terminal</span>
            </div>
          </div>
        </div>
        <TerminalPreview />
      </div>
    </section>
  );
}

export default Hero;
