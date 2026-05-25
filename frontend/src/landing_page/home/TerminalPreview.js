import React, { useState, useEffect } from "react";

const INITIAL = [
  { sym: "AAPL", price: 189.42, up: true },
  { sym: "MSFT", price: 415.28, up: true },
  { sym: "NVDA", price: 878.15, up: false },
  { sym: "TSLA", price: 248.91, up: true },
  { sym: "AMZN", price: 178.33, up: false },
  { sym: "GOOGL", price: 171.56, up: true },
];

const TerminalPreview = () => {
  const [rows, setRows] = useState(INITIAL);
  const [active, setActive] = useState("NVDA");
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const sym = prev[idx].sym;
        setFlash(sym);
        setTimeout(() => setFlash(null), 400);
        return prev.map((r, i) => {
          if (i !== idx) return r;
          const delta = (Math.random() - 0.48) * 2;
          return { ...r, price: Math.max(1, r.price + delta), up: delta >= 0 };
        });
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const activeRow = rows.find((r) => r.sym === active) || rows[0];
  const barHeights = [40, 65, 35, 80, 55, 70, 45, 90, 50, 75, 60, 85];

  return (
    <div className="mk-terminal-preview glass">
      <div className="mk-terminal-chrome">
        <div className="mk-terminal-dots">
          <span /><span /><span />
        </div>
        <span className="mk-terminal-url">tradedash.app/terminal</span>
      </div>
      <div className="mk-terminal-body">
        <div className="mk-tp-watchlist">
          <div className="mk-tp-watch-header">Watchlist · LIVE</div>
          {rows.map((r) => (
            <div
              key={r.sym}
              className={`mk-tp-row ${active === r.sym ? "active" : ""} ${
                flash === r.sym ? (r.up ? "flash-up" : "flash-down") : ""
              }`}
              onClick={() => setActive(r.sym)}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              <span className="mk-tp-symbol">{r.sym}</span>
              <span className={`mk-tp-price mono ${r.up ? "up" : "down"}`}>
                {r.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mk-tp-chart">
          <div className="mk-tp-chart-header">
            <span className="mk-tp-chart-title">{activeRow.sym}</span>
            <span className={`mono ${activeRow.up ? "up" : "down"}`} style={{ color: activeRow.up ? "#00d4ff" : "#ff4757" }}>
              ${activeRow.price.toFixed(2)}
            </span>
          </div>
          <div className="mk-tp-bars">
            {barHeights.map((h, i) => (
              <div key={i} className="mk-tp-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="mk-tp-order">
          <h4>Order</h4>
          <div className="mono" style={{ color: "#00d4ff", fontWeight: 600 }}>{active}</div>
          <div style={{ marginTop: 8, color: "rgba(148,163,184,0.7)" }}>MKT · BUY</div>
          <button type="button" className="mk-tp-buy-btn">EXECUTE</button>
        </div>
      </div>
    </div>
  );
};

export default TerminalPreview;
