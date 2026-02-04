import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./adminLayouts/AdminLayout";
import AdminRoutes from "./routes/adminRoutes";
import AuthRoutes from "./routes/authRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function AdminApp() {
  return (
    <Routes>

      {/* 🔓 Auth routes */}
      {AuthRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* 🔒 Admin routes */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Redirect /admin → /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {AdminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

    </Routes>
  );
}
