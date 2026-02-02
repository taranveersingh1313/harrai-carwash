
// import "./assets/css/App.css";
// import { Routes, Route, useLocation } from "react-router-dom";

// import Header from "./layouts/header";
// import Footer from "./layouts/Footer";
// import Home from "./Home";
// import Login from "./pages/Login";
// import AdminApp from "./admin/AdminApp.tsx";

// <Route path="/admin/*" element={<AdminApp />} />


// function App() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login";

//   return (
//     <>
//       {!isLoginPage && <Header />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>

//       {!isLoginPage && <Footer />}
//     </>
//   );
// }

// export default App;

import "./assets/css/App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./layouts/header";
import Footer from "./layouts/Footer";
import Home from "./Home";
import Login from "./pages/Login";
import AdminApp from "./admin/AdminApp";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Hide header/footer on admin + login */}
      {!isLoginPage && !isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ ADMIN ROUTE */}
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>

      {!isLoginPage && !isAdminPage && <Footer />}
    </>
  );
}

export default App;



