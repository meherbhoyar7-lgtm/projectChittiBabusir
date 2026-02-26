import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;