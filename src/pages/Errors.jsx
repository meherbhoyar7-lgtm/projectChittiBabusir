import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import MetricCard from "../components/MetricCard";

const Errors = () => {
  const { errors, history, theme } = useSelector(
    (state) => state.dashboard
  );

  const chartData = useMemo(() => {
    if (!history?.length) return [];

    return history.map((item) => ({
      time: new Date(item.timestamp).toLocaleTimeString([], {
        minute: "2-digit",
        second: "2-digit",
      }),
      errors: item.errors,
    }));
  }, [history]);

  return (
    <div className={`errors-page ${theme}`}>
      {/* ===== Metrics ===== */}
      <div className="errors-metrics">
        <MetricCard title="System Errors" value={errors} />
        <MetricCard
          title="Health Status"
          value={errors > 4 ? "CRITICAL" : errors > 2 ? "WARNING" : "STABLE"}
        />
      </div>

      {/* ===== Charts Row ===== */}
      <div className="errors-charts">
        {/* Line Chart */}
        <div className="errors-card">
          <h3>Error Trend</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, "dataMax + 2"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="errors"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="errors-card">
          <h3>Error Distribution</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, "dataMax + 2"]} />
                <Tooltip />
                <Bar
                  dataKey="errors"
                  fill="#dc2626"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Errors;