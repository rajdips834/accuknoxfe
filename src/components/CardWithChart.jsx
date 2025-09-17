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
  type = "pie", // "pie" or "bar"
  title = "Chart",
  data = [], // fallback empty array
  height = 240,
  legendPlacement = "right",
  colors = defaultColors,
}) {
  // Guard against no data
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
        borderWidth: 1,
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
        borderRadius: 6,
      },
    ],
  };

  const pieOptions = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: "#6B7280" },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6B7280" } },
      y: {
        grid: { color: "rgba(156,163,175,0.2)" },
        ticks: { color: "#6B7280" },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 md:p-6 w-full max-w-3xl min-w-[700px]"
    >
      {/* Title */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </h3>
          {type === "pie" && hasData && (
            <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
              Total: <span className="font-medium">{total}</span>
            </p>
          )}
        </div>
      </div>

      {/* Chart Area */}
      <div
        className="flex flex-col md:flex-row items-center md:items-stretch gap-4 mt-4"
        style={{
          minHeight: typeof height === "number" ? height + 40 : undefined,
        }}
      >
        {hasData ? (
          <>
            <div className="flex-1 min-w-[330px]" style={{ height }}>
              {type === "pie" ? (
                <Pie data={pieData} options={pieOptions} />
              ) : (
                <Bar data={barData} options={barOptions} />
              )}
            </div>

            {/* Legend for Pie */}
            {type === "pie" && (
              <div
                style={
                  legendPlacement === "right"
                    ? { alignSelf: "center" }
                    : { marginTop: 8 }
                }
                role="list"
                aria-label="Chart legend"
              >
                {safeData.map((d, i) => {
                  const pct =
                    total === 0 ? 0 : ((d.value / total) * 100).toFixed(1);
                  return (
                    <div
                      key={d.name || i}
                      className="flex items-center justify-between gap-3"
                      role="listitem"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span
                          aria-hidden
                          className="w-4 h-4 rounded-sm shrink-0"
                          style={{ backgroundColor: colors[i % colors.length] }}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                          {d.name || "Unnamed"}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-300">
                        {d.value || 0} ({pct}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          // No Data Fallback
          <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400 h-40">
            No data available
          </div>
        )}
      </div>
    </motion.div>
  );
}
