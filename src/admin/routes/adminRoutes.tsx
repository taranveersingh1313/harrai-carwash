
import Dashboard from "../pages/dashboard/index";
import AdminList from "../pages/admins/index";
import CreateAdmin from "../pages/admins/create";


const AdminRoutes = [

  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "admin-list",
    element: <AdminList />,
  },
  {
    path: "create-admin",
    element: <CreateAdmin />,
  },
  {
    path: "edit-admin/:id",
    element: <CreateAdmin />,
  },
];

export default AdminRoutes;
