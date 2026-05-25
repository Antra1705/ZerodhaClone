import React from "react";

const TICKERS = [
  { sym: "SPY", px: "523.41", chg: "+0.38%", up: true },
  { sym: "QQQ", px: "441.22", chg: "+0.61%", up: true },
  { sym: "AAPL", px: "189.42", chg: "+1.12%", up: true },
  { sym: "NVDA", px: "878.15", chg: "-0.44%", up: false },
  { sym: "TSLA", px: "248.91", chg: "+2.01%", up: true },
  { sym: "MSFT", px: "415.28", chg: "+0.29%", up: true },
  { sym: "AMZN", px: "178.33", chg: "-0.18%", up: false },
  { sym: "META", px: "512.77", chg: "+0.85%", up: true },
];

function TickerStrip() {
  const items = [...TICKERS, ...TICKERS];
  return (
    <div className="mk-ticker">
      <div className="mk-ticker-track">
        {items.map((t, i) => (
          <div key={`${t.sym}-${i}`} className="mk-ticker-item">
            <span className="sym">{t.sym}</span>
            <span className="px mono">{t.px}</span>
            <span className={`chg mono ${t.up ? "up" : "down"}`}>{t.chg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TickerStrip;
