import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import MetricCard from "../components/MetricCard";
import { useMemo } from "react";

const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

const Performance = () => {
  const { cpu, users, memory, network, history, theme } =
    useSelector((state) => state.dashboard);

  const chartData = useMemo(() => {
    if (!history || history.length === 0) return [];

    return history.map((item, index) => ({
      time: index + 1,  
      cpu: item.cpu,
      users: item.users,
      memory: item.memory,
      network: item.network,
    }));
  }, [history]);

  const pieData = [
    { name: "CPU", value: cpu },
    { name: "Memory", value: memory },
    { name: "Network", value: network },
  ];

  return (
    <div className={`page ${theme}`}>

      <div className="grid">
        <MetricCard title="CPU Usage" value={`${cpu}%`} />
        <MetricCard title="Active Users" value={users} />
        <MetricCard title="Memory Usage" value={`${memory}%`} />
        <MetricCard title="Network Load" value={`${network}%`} />
      </div>

      <div className="chart-card">
        <h3>CPU & Users Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" interval={0} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#8884d8"
              strokeWidth={3}
              dot={false}
              isAnimationActive
              animationDuration={400}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={false}
              isAnimationActive
              animationDuration={400}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Memory Usage Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" interval={0} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="memory"
              stroke="#ff7300"
              fill="#ff7300"
              isAnimationActive
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>User Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" interval={0} />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="users"
              fill="#00C49F"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={400}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>System Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Performance;