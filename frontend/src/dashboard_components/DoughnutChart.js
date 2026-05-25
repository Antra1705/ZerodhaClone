import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, ChartTooltip, Legend);

export function DoughnutChart({ data }) {
  return <Doughnut data={data} />;
}