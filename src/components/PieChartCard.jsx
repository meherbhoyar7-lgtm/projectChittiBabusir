import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const PieChartCard = () => {
  const { users, errors, cpu } = useSelector((state) => state.dashboard);

  const data = [
    { name: "Active Users", value: users },
    { name: "Errors", value: errors },
    { name: "CPU Load", value: cpu },
  ];

  const COLORS = ["#4CAF50", "#F44336", "#2196F3"];

  return (
    <div className="chart-card">
      <h3>System Distribution</h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartCard;