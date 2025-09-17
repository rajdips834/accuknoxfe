import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const defaultColors = [
  "#4F46E5",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#10B981",
  "#8B5CF6",
];

export default function CardWithChart({
  type = "pie",
  title = "Chart",
  data = [],
  height = 440,
  legendPlacement = "right",
  colors = defaultColors,
}) {
  const safeData = Array.isArray(data) ? data : [];
  const hasData = safeData.length > 0;

  const total = hasData ? safeData.reduce((s, d) => s + (d.value || 0), 0) : 0;
  const labels = hasData ? safeData.map((d) => d.name) : [];
  const values = hasData ? safeData.map((d) => d.value) : [];

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Value",
        data: values,
        backgroundColor: colors[0] || "#4F46E5",
        borderRadius: 8,
        barPercentage: 0.6,
      },
    ],
  };

  const pieOptions = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6B7280" } },
      y: {
        grid: { color: "rgba(156,163,175,0.15)" },
        ticks: { color: "#6B7280" },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 w-full max-w-3xl min-w-[680px]"
    >
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {type === "pie" && hasData && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total:{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {total}
            </span>
          </p>
        )}
      </div>

      {/* Chart + Legend */}
      <div
        className={`grid gap-6 mt-2 ${
          type === "pie" && legendPlacement === "right"
            ? "md:grid-cols-[1fr_200px]"
            : "grid-cols-1"
        }`}
        style={{ minHeight: height + 40 }}
      >
        {/* Chart */}
        <div className="flex items-center justify-center">
          {hasData ? (
            type === "pie" ? (
              <Pie data={pieData} options={pieOptions} />
            ) : (
              <Bar data={barData} options={barOptions} />
            )
          ) : (
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              No data available
            </div>
          )}
        </div>

        {/* Legend */}
        {hasData && (
          <div className="flex flex-col gap-3 justify-center">
            {safeData.map((d, i) => {
              const pct =
                total === 0 ? 0 : ((d.value / total) * 100).toFixed(1);
              return (
                <div
                  key={d.name || i}
                  className="flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 px-2 py-1 rounded-lg transition"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: colors[i % colors.length] }}
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                      {d.name || "Unnamed"}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {d.value || 0} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
