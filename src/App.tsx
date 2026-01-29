
import "./assets/css/App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./layouts/header";
import Footer from "./layouts/Footer";
import Home from "./Home";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;

