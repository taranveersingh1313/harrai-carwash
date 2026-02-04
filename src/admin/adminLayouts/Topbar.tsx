import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
      });
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login", { replace: true });
  };

  // 🔥 Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <h3>Dashboard</h3>

      <div
        className="profile-wrapper"
        ref={dropdownRef}
        onMouseEnter={() => setOpen(true)}
        // onMouseLeave={() => setOpen(false)}
      >
        <div className="profile">
          👤 Admin
        </div>

        {open && (
          <div className="profile-dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
