import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import api from "../api";
import "./TerminalChart.css";

const TerminalChart = ({ symbol }) => {
  const chartContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartType, setChartType] = useState("candlestick");
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    setError("");

    api
      .get(`/api/chart/${symbol}`)
      .then((res) => {
        setChartData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || "Failed to load chart data");
        setLoading(false);
      });
  }, [symbol]);

  useEffect(() => {
    if (loading || error || chartData.length === 0 || !chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const container = chartContainerRef.current;
    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { type: "solid", color: "transparent" },
        textColor: "rgba(148, 163, 184, 0.9)",
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines: { color: "rgba(0, 212, 255, 0.06)" },
        horzLines: { color: "rgba(0, 212, 255, 0.06)" },
      },
      rightPriceScale: {
        borderColor: "rgba(0, 212, 255, 0.15)",
      },
      timeScale: {
        borderColor: "rgba(0, 212, 255, 0.15)",
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    const volumeSeries = chart.addHistogramSeries({
      color: "rgba(0, 212, 255, 0.35)",
      priceFormat: { type: "volume" },
      priceScaleId: "volume-scale",
    });

    chart.priceScale("volume-scale").applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    volumeSeries.setData(
      chartData.map((d) => ({
        time: d.time,
        value: d.volume,
        color: d.close >= d.open ? "rgba(0, 212, 255, 0.45)" : "rgba(255, 71, 87, 0.45)",
      }))
    );

    if (chartType === "candlestick") {
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: "#00d4ff",
        downColor: "#ff4757",
        borderVisible: false,
        wickUpColor: "#00d4ff",
        wickDownColor: "#ff4757",
      });
      candlestickSeries.setData(chartData);
    } else {
      const lineSeries = chart.addLineSeries({
        color: "#00d4ff",
        lineWidth: 2,
      });
      lineSeries.setData(chartData.map((d) => ({ time: d.time, value: d.close })));
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartRef.current && container) {
        chartRef.current.applyOptions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [loading, error, chartData, chartType]);

  return (
    <div className="terminal-chart-panel">
      <div className="terminal-chart-header">
        <div className="terminal-chart-symbol">
          <span className="symbol-ticker">{symbol || "—"}</span>
          <span className="symbol-exchange">NASDAQ · US EQUITY</span>
        </div>
        <div className="terminal-chart-controls">
          <button
            type="button"
            className={`chart-type-btn ${chartType === "candlestick" ? "active" : ""}`}
            onClick={() => setChartType("candlestick")}
          >
            Candles
          </button>
          <button
            type="button"
            className={`chart-type-btn ${chartType === "line" ? "active" : ""}`}
            onClick={() => setChartType("line")}
          >
            Line
          </button>
        </div>
      </div>

      <div className="terminal-chart-body">
        {loading && (
          <div className="terminal-chart-state">
            <span className="terminal-pulse" />
            <p>Loading {symbol}…</p>
          </div>
        )}
        {error && !loading && (
          <div className="terminal-chart-state error">
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && chartData.length > 0 && (
          <div className="terminal-chart-canvas" ref={chartContainerRef} />
        )}
      </div>
    </div>
  );
};

export default TerminalChart;
