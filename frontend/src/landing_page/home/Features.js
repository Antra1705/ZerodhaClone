import React from "react";

const features = [
  {
    icon: "⚡",
    title: "Live tick stream",
    desc: "Finnhub WebSocket relay broadcasts every price change to your watchlist with micro-flash animations — no polling, no lag.",
  },
  {
    icon: "📊",
    title: "TradingView charts",
    desc: "Candlesticks, volume histograms, and line series powered by lightweight-charts. JWT-protected with server-side caching.",
  },
  {
    icon: "🎯",
    title: "Smart order tickets",
    desc: "Market, limit, and stop-loss orders with instant execution logic. Docked ticket stays in sync with your active symbol.",
  },
  {
    icon: "🔐",
    title: "Session security",
    desc: "JWT auth with unified SPA routing — one login, zero cross-origin friction between marketing and terminal.",
  },
  {
    icon: "📡",
    title: "Dense data layout",
    desc: "Three-column terminal: watchlist, chart workspace, order rail. Built for screens full of information, not empty whitespace.",
  },
  {
    icon: "🌐",
    title: "US markets first",
    desc: "NASDAQ-focused symbols, dollar-denominated P&L, and indices tuned for American equities — not repurposed Indian broker UI.",
  },
];

function Features() {
  return (
    <section className="mk-section">
      <div className="mk-section-header">
        <h2>Engineered for flow state</h2>
        <p>
          Every pixel serves a purpose. TradeDash strips away brochureware and
          delivers what prop desks actually use.
        </p>
      </div>
      <div className="mk-features-grid">
        {features.map((f) => (
          <article key={f.title} className="mk-feature-card glass">
            <div className="mk-feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Features;
