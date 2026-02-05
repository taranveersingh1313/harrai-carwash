import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAdmin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/admin/create-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate("/admin/admin-list");
    } else {
      alert("Failed to create admin");
    }
  };

  return (
    <div className="page-wrapper">
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1 className="page-title">Create Admin</h1>
        <p className="page-subtitle">
          Add a new administrator with access to the system
        </p>
      </div>

      {/* FULL WIDTH FORM */}
      <form className="full-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="admin@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone_number"
                placeholder="+91 98765 43210"
                value={form.phone_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="form-actions sticky-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/admin/admin-list")}
          >
            Cancel
          </button>

          <button type="submit" className="btn-primary">
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
}
