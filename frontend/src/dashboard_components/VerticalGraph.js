import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: { color: "rgba(148, 163, 184, 0.8)", font: { size: 10 } },
    },
    title: {
      display: true,
      text: "Holdings allocation",
      color: "rgba(148, 163, 184, 0.9)",
      font: { size: 11, weight: "500" },
    },
  },
  scales: {
    x: {
      ticks: { color: "rgba(148, 163, 184, 0.6)", font: { size: 9 } },
      grid: { color: "rgba(0, 212, 255, 0.06)" },
    },
    y: {
      ticks: { color: "rgba(148, 163, 184, 0.6)", font: { size: 9 } },
      grid: { color: "rgba(0, 212, 255, 0.06)" },
    },
  },
};

export function VerticalGraph({ data }) {
  return <Bar options={options} data={data} />;
}