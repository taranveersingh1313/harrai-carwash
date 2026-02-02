import Sidebar from "./Sidebar.tsx";
import Topbar from "./Topbar.tsx";
import "../assets/css/admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
