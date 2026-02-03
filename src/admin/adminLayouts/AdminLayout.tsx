// import Sidebar from "./Sidebar.tsx";
// import Topbar from "./Topbar.tsx";
// import "../assets/css/admin.css";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Topbar />
//         <div className="admin-content">{children}</div>
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../assets/css/admin.css";

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Topbar />

        {/* 🔥 THIS is where dashboard will render */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
