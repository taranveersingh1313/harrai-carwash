import { NavLink } from "react-router-dom";
import "../assets/css/Sidebar.css";
import { useAuth } from "../config/AuthUser";

export default function Sidebar() {
  const { admin } = useAuth();
  return (
    <aside className="sidebar">
      <h2 className="logo">{admin?.name || "Admin"}</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/admin-list">Admins</NavLink>
        <NavLink to="/admin/profile">Profile</NavLink>
      </nav>
    </aside>
  );
}
