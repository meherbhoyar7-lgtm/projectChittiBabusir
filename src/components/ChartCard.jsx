import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const ChartCard = ({ range }) => {
  const { history } = useSelector((state) => state.dashboard);

  const chartData = useMemo(() => {
    if (!history || history.length === 0) return [];

    return history.map((item, index) => ({
      time: index + 1,
      users: item.users,
      cpu: item.cpu,
    }));
  }, [history]);

  return (
    <div className="chart-card">
      <h3>Users & CPU Trend ({range})</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="time" interval={0} />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            isAnimationActive
            animationDuration={400}
          />

          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            isAnimationActive
            animationDuration={400}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;