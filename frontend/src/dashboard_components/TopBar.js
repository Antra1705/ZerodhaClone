import React from "react";
import Menu from "./Menu";

const indices = [
  { label: "SPX", value: "5,234.18", change: "+0.42%", up: true },
  { label: "NDX", value: "18,421.55", change: "+0.68%", up: true },
  { label: "DJI", value: "39,127.80", change: "-0.12%", up: false },
];

const TopBar = () => {
  return (
    <header className="topbar-container">
      <div className="topbar-brand">
        <span className="brand-mark">TD</span>
        <span className="brand-name">TradeDash</span>
        <span className="brand-tag">TERMINAL</span>
      </div>

      <div className="indices-container">
        {indices.map((idx) => (
          <div key={idx.label} className="index-tile">
            <span className="index">{idx.label}</span>
            <span className="index-points mono">{idx.value}</span>
            <span className={`percent mono ${idx.up ? "up" : "down"}`}>{idx.change}</span>
          </div>
        ))}
      </div>

      <Menu />
    </header>
  );
};

export default TopBar;
