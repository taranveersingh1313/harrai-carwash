

import "./assets/css/App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./layouts/header";
import Footer from "./layouts/Footer";
import Home from "./Home";
import AdminLogin from "./admin/pages/Login";
import Login from "./pages/Login";
import AdminApp from "./admin/AdminApp";

function App() {
  const location = useLocation();
  const isAdminLoginPage = location.pathname === "/admin/login";
  const isLoginPage = location.pathname === "/login";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Hide header/footer on admin + login */}
      {!isAdminLoginPage && !isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ ADMIN ROUTE */}
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>

      {!isLoginPage && !isAdminPage && <Footer />}
    </>
  );
}

export default App;



