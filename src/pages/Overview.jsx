import { useSelector, useDispatch } from "react-redux";
import { updateMetrics } from "../store/dashboardSlice";
import MetricCard from "../components/MetricCard";
import ChartCard from "../components/ChartCard";
import RefreshButton from "../components/RefreshButton";
import { useWebSocketSimulator } from "../hooks/useWebSocketSimulator";
import { useState, useMemo } from "react";
import PieChartCard from "../components/PieChartCard";

const Overview = () => {
  const dispatch = useDispatch();
  const { users, cpu, errors } = useSelector(
    (state) => state.dashboard
  );

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = storedUser?.username;

  const [range, setRange] = useState("Today");

  useWebSocketSimulator();

  const multiplier = useMemo(() => {
    if (range === "Today") return 1;
    if (range === "This Week") return 7;
    return 30;
  }, [range]);

  const revenue = users * 12 * multiplier;
  const expectedIncome = users * 18 * multiplier;
  const growth = ((users % 15) + 5).toFixed(1);

  return (
    <div className="content">

      <div className="overview-header">
        <div>
          <h2>
            Welcome back{currentUser ? `, ${currentUser}` : ""} 👋
          </h2>
          <p className="subtitle">
            Real-time analytics and intelligent system insights.
          </p>
        </div>

        <div className="header-actions">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="range-select"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>

          <RefreshButton onClick={() => dispatch(updateMetrics())} />
        </div>
      </div>

      <div className="grid">
        <MetricCard title="Active Users" value={users * multiplier} />
        <MetricCard title="CPU Usage %" value={cpu} />
        <MetricCard title="Error Count" value={errors} />
        <MetricCard title="Revenue" value={`$${revenue.toLocaleString()}`} />
        <MetricCard title="Expected Income" value={`$${expectedIncome.toLocaleString()}`} />
        <MetricCard title="Growth Rate" value={`+${growth}%`} />
      </div>

      <ChartCard range={range} />

      <div className="analytics-grid">

        <div className="chart-card">
          <h3>AI Insights</h3>
          <ul className="activity-list">
            <li>⚡ Traffic increased by {growth}% in {range}</li>
            <li>📉 Error rate stable</li>
            <li>🔥 CPU spike probability: {(cpu % 40) + 30}%</li>
            <li>💡 Revenue projection strong</li>
          </ul>
        </div>

        <PieChartCard />

      </div>

      <div className="chart-card" style={{ marginTop: "30px" }}>
        <h3>Top Regions</h3>
        <div className="region-row">
          <span>🇮🇳 India</span>
          <span>{(users % 50) + 30}%</span>
        </div>
        <div className="region-row">
          <span>🇺🇸 USA</span>
          <span>{(users % 25) + 15}%</span>
        </div>
        <div className="region-row">
          <span>🇩🇪 Germany</span>
          <span>{(users % 10) + 10}%</span>
        </div>
        <div className="region-row">
          <span>🌍 Others</span>
          <span>18%</span>
        </div>
      </div>

      <div className="chart-card" style={{ marginTop: "30px" }}>
        <h3>Notifications</h3>
        <ul className="activity-list">
          {currentUser && (
            <li>🔐 {currentUser} logged in successfully</li>
          )}
          <li>🚀 New deployment completed</li>
          <li>⚠ High memory usage detected</li>
          <li>✅ Daily backup successful</li>
          <li>📊 Revenue target {range} is 82% achieved</li>
        </ul>
      </div>

      <div className="status-bar">
        <div className="status green">Database: Online</div>
        <div className="status green">API: Stable</div>
        <div className="status yellow">Cache: {(cpu % 30) + 50}% Usage</div>
        <div className="status red">Jobs: {errors} Failed</div>
      </div>

    </div>
  );
};

export default Overview;