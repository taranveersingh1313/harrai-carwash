import { Routes, Route } from "react-router-dom";
import AdminLayout from "./adminLayouts/AdminLayout";
import AdminRoutes from "./routes/adminRoutes";

//  console.log("AdminRoutes:", AdminRoutes);

export default function AdminApp() {
  return (
    <AdminLayout>
      <Routes>
       
        
        {AdminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </AdminLayout>
  );
}
