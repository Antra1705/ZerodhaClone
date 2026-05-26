import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
} from "lightweight-charts";
import api from "../api";
import "./StockChartDrawer.css";

const StockChartDrawer = ({ symbol, onClose }) => {
  const chartContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartType, setChartType] = useState("candlestick"); // "candlestick" or "line"
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const lineSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError("");

    api.get(`/api/chart/${symbol}`)
      .then((res) => {
        setChartData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching chart data:", err);
        setError(err.response?.data?.msg || "Failed to load stock data");
        setLoading(false);
      });
  }, [symbol]);

  useEffect(() => {
    if (loading || error || chartData.length === 0 || !chartContainerRef.current) return;

    // Clean up previous chart instance
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const container = chartContainerRef.current;
    
    // Create TradingView lightweight chart instance
    const chart = createChart(container, {
      width: container.clientWidth,
      height: 400,
      layout: {
        background: { type: "solid", color: "#1e222d" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.3)" },
        horzLines: { color: "rgba(42, 46, 57, 0.3)" },
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Volume Chart setup (separate pane at bottom of the same chart)
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });
    volumeSeriesRef.current = volumeSeries;

    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    const volumeData = chartData.map((d) => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? "rgba(38, 166, 154, 0.5)" : "rgba(239, 83, 80, 0.5)",
    }));
    volumeSeries.setData(volumeData);

    // Dynamic rendering of Candlestick vs Line Chart
    if (chartType === "candlestick") {
      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      candlestickSeries.setData(chartData);
      candlestickSeriesRef.current = candlestickSeries;
    } else {
      const lineSeries = chart.addSeries(LineSeries, {
        color: "#29b6f6",
        lineWidth: 2,
      });
      const lineData = chartData.map((d) => ({
        time: d.time,
        value: d.close,
      }));
      lineSeries.setData(lineData);
      lineSeriesRef.current = lineSeries;
    }

    chart.timeScale().fitContent();

    // Handle responsiveness
    const handleResize = () => {
      if (chartRef.current && container) {
        chartRef.current.applyOptions({ width: container.clientWidth });
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
    <div className="stock-chart-drawer-overlay">
      <div className="stock-chart-drawer">
        <div className="drawer-header">
          <div className="header-info">
            <h2>{symbol} Analytics</h2>
            <span className="exchange-tag">NASDAQ US EQUITIES</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="drawer-body">
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching daily ticks for {symbol}...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <span className="error-icon">⚠️</span>
              <h3>Failed to load charts</h3>
              <p>{error}</p>
              <button
                className="retry-btn"
                onClick={() => {
                  setLoading(true);
                  setError("");
                  api.get(`/api/chart/${symbol}`)
                    .then((res) => {
                      setChartData(res.data);
                      setLoading(false);
                    })
                    .catch((err) => {
                      setError(err.response?.data?.msg || "Failed to load stock data");
                      setLoading(false);
                    });
                }}
              >
                Retry Request
              </button>
            </div>
          )}

          {!loading && !error && chartData.length > 0 && (
            <div className="chart-wrapper">
              <div className="chart-controls">
                <button
                  className={`control-btn ${chartType === "candlestick" ? "active" : ""}`}
                  onClick={() => setChartType("candlestick")}
                >
                  🕯️ Candlesticks
                </button>
                <button
                  className={`control-btn ${chartType === "line" ? "active" : ""}`}
                  onClick={() => setChartType("line")}
                >
                  📈 Line Chart
                </button>
              </div>

              <div className="tradingview-container" ref={chartContainerRef}></div>
              
              <div className="chart-legend">
                <span className="legend-item"><span className="dot green"></span> Bullish Close</span>
                <span className="legend-item"><span className="dot red"></span> Bearish Close</span>
                <span className="legend-item"><span className="dot blue"></span> Price Line</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockChartDrawer;
