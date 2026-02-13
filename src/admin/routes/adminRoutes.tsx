
import Dashboard from "../pages/dashboard/index";
import AdminList from "../pages/admins/index";
import CreateAdmin from "../pages/admins/create";
import ProfileEdit from "../pages/profile/index";
import CustomerList from "../pages/customers/customer_list";
import CreateCustomer from "../pages/customers/create";


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
  {
    path: "profile",
    element: <ProfileEdit />,
  },
  {
    path: "customer-list",
    element: <CustomerList />,
  },
  {
    path: "create-customer",
    element: <CreateCustomer />,
  },
  {
    path: "edit-customer/:id",
    element: <CreateCustomer />,
  },
];

export default AdminRoutes;
