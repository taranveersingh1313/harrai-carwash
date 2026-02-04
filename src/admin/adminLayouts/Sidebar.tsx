import { NavLink } from "react-router-dom";
import "../assets/css/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Admin</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/admin-list">Admins</NavLink>
      </nav>
    </aside>
  );
}
