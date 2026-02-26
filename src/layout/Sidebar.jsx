import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2>Dashboard</h2>

      
      <NavLink to="">Overview</NavLink>
      <NavLink to="performance">Performance</NavLink>
      <NavLink to="errors">Errors</NavLink>
    </nav>
  );
};

export default Sidebar;