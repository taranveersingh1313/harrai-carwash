// import Dashboard from "../pages/dashboard/index";
// // import Users from "../pages/Users/Users";
// // import Settings from "../pages/Settings/Settings";

// export default [
//   { path: "/admin/dashboard", element: <Dashboard /> },
// //   { path: "users", element: <Users /> },
// //   { path: "settings", element: <Settings /> },
// ];

import Dashboard from "../pages/dashboard/index";

const AdminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
];

export default AdminRoutes;
