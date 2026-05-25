import React from "react";

const Summary = () => {
  return (
    <div className="terminal-page summary-page">
      <div className="page-header">
        <h2 className="page-title">Portfolio Overview</h2>
        <span className="page-meta mono">Session · US MARKET</span>
      </div>

      <div className="metric-grid">
        <div className="metric-card glass-panel">
          <span className="metric-label">Margin available</span>
          <span className="metric-value mono">$3,740.00</span>
          <span className="metric-sub">Equity account</span>
        </div>
        <div className="metric-card glass-panel">
          <span className="metric-label">Margins used</span>
          <span className="metric-value mono muted">$0.00</span>
          <span className="metric-sub">Intraday + delivery</span>
        </div>
        <div className="metric-card glass-panel">
          <span className="metric-label">Unrealized P&amp;L</span>
          <span className="metric-value mono up">+$1,550.00</span>
          <span className="metric-sub up">+5.20%</span>
        </div>
        <div className="metric-card glass-panel">
          <span className="metric-label">Portfolio value</span>
          <span className="metric-value mono">$31,430.00</span>
          <span className="metric-sub">13 positions</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
