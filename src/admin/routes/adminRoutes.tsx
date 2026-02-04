
import Dashboard from "../pages/dashboard/index";
import AdminList from "../pages/admins/index";


const AdminRoutes = [

  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "admin-list",
    element: <AdminList />,
  },
];

export default AdminRoutes;
