// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { countries } from "../../config/countries";

// export default function CreateAdmin() {
//     const navigate = useNavigate();
//     const dropdownRef = useRef(null);

//     const [isOpen, setIsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [form, setForm] = useState({
//         admin_type: "2",
//         name: "",
//         email: "",
//         username: "",
//         country_code: "+91",
//         country_iso: "in",
//         phone_number: "",
//         password: "",
//     });

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSelectCountry = (country) => {
//         setForm({
//             ...form,
//             country_iso: country.iso,
//             country_code: country.code
//         });
//         setIsOpen(false);
//         setSearchTerm("");
//     };

//     // Filter logic
//     const filteredCountries = countries.filter((c) =>
//         c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         c.code.includes(searchTerm)
//     );

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { country_iso, ...payload } = form;

//         const res = await fetch("http://localhost:5000/api/admin/save-admin", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: JSON.stringify(payload),
//         });

//         if (res.ok) {
//             navigate("/admin/admin-list");
//         } else {
//             alert("Failed to create admin");
//         }
//     };

//     return (
//         <div className="page-wrapper">
//             <input type="hidden" name="id" />

             
//             <div className="page-header">
//                 <h1 className="page-title">Create Admin</h1>
//                 <p className="page-subtitle">Add a new administrator with searchable country codes</p>
//             </div>

//             <form className="full-form" onSubmit={handleSubmit}>
//                 <div className="form-section">
//                     <h3 className="section-title">Basic Information</h3>
//                     <div className="form-grid">

//                         {/* Other fields stay the same */}
//                         <div className="form-group">
//                             <label>Admin Type</label>
//                             <select name="admin_type" className="form-control" value={form.admin_type} onChange={handleChange} required>
//                                 <option value="">Select Admin</option>
//                                 <option value="1">Super Admin</option>
//                                 <option value="2">Admin</option>
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <label>Full Name</label>
//                             <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
//                         </div>

//                         <div className="form-group">

//                             <label>User Name</label>

//                             <input type="text" name="username" placeholder="Enter User Name" value={form.username} onChange={handleChange} className="form-control" required />

//                         </div>



//                         <div className="form-group">

//                             <label>Email Address</label>

//                             <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />

//                         </div>

//                         {/* PHONE NUMBER SECTION WITH SEARCHABLE DROPDOWN */}
//                         <div className="form-group">
//                             <label>Phone Number</label>
//                             <div style={{ display: "flex", gap: "10px" }}>

//                                 <div style={{ position: "relative", width: "110px" }} ref={dropdownRef}>
//                                     {/* Selected Display */}
//                                     <div
//                                         className="form-control"
//                                         onClick={() => setIsOpen(!isOpen)}
//                                         style={{
//                                             cursor: "pointer",
//                                             display: "flex",
//                                             alignItems: "center",
//                                             gap: "10px",
//                                             backgroundColor: "#fff"
//                                         }}
//                                     >
//                                         <img src={`https://flagcdn.com/w20/${form.country_iso}.png`} alt="flag" width="20" />
//                                         <span>{form.country_code}</span>
//                                         <span style={{ marginLeft: "auto", fontSize: "10px" }}>▼</span>
//                                     </div>

//                                     {/* Searchable Menu */}
//                                     {isOpen && (
//                                         <div style={{
//                                             position: "absolute",
//                                             top: "100%",
//                                             left: 0,
//                                             width: "280px",
//                                             background: "white",
//                                             border: "1px solid #ddd",
//                                             borderRadius: "4px",
//                                             zIndex: 100,
//                                             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                                             marginTop: "4px"
//                                         }}>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Search country or code..."
//                                                 className="form-control"
//                                                 style={{ border: "none", borderBottom: "1px solid #eee", borderRadius: 0 }}
//                                                 value={searchTerm}
//                                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                                 autoFocus
//                                             />
//                                             <div style={{ maxHeight: "200px", overflowY: "auto" }}>
//                                                 {filteredCountries.map((c) => (
//                                                     <div
//                                                         key={c.iso}
//                                                         onClick={() => handleSelectCountry(c)}
//                                                         style={{
//                                                             padding: "10px",
//                                                             cursor: "pointer",
//                                                             display: "flex",
//                                                             alignItems: "center",
//                                                             gap: "10px",
//                                                             borderBottom: "1px solid #f9f9f9"
//                                                         }}
//                                                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f7ff"}
//                                                         onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
//                                                     >
//                                                         <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt="" width="20" />

//                                                         {/* FIXED: Added color: "#333" to prevent fading */}
//                                                         <span style={{ fontSize: "14px", flex: 1, color: "#333", fontWeight: "400" }}>
//                                                             {c.name}
//                                                         </span>

//                                                         <span style={{ fontSize: "13px", color: "#666" }}>{c.code}</span>
//                                                     </div>
//                                                 ))}
//                                                 {filteredCountries.length === 0 && (
//                                                     <div style={{ padding: "10px", color: "#999", textAlign: "center" }}>No results</div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <input
//                                     type="text"
//                                     name="phone_number"
//                                     placeholder="Phone number"
//                                     className="form-control"
//                                     value={form.phone_number}
//                                     onChange={handleChange}
//                                     style={{ flex: 1 }}
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         <div className="form-group">
//                             <label>Password</label>
//                             <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" required />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="form-actions sticky-actions">
//                     <button type="button" className="btn-secondary" onClick={() => navigate("/admin/admin-list")}>Cancel</button>
//                     <button type="submit" className="btn-primary">Create Admin</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { countries } from "../../config/countries";

export default function CreateAdmin() {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 edit mode
  const isEdit = Boolean(id);

  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    admin_type: "2",
    name: "",
    email: "",
    username: "",
    country_code: "+91",
    country_iso: "in",
    phone_number: "",
    password: "",
  });

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- FETCH ADMIN WHEN EDIT ---------------- */
  useEffect(() => {
    if (!isEdit) return;

    const fetchAdmin = async () => {
      const res = await fetch(
        `http://localhost:5000/api/admin/edit-admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

       console.log("Fetched admin data:", data);

      if (data.success) {
         console.log("Fetched admin data success:", data.success);
        setForm({
          admin_type: data.data.type,
          name: data.data.name,
          email: data.data.email,
          username: data.data.username,
          country_code: data.data.country_code,
          country_iso: data.data.country_iso || "in",
          phone_number: data.data.phone_number,
          password: "", // never prefill password
        });
      }
    };

    fetchAdmin();
  }, [id, isEdit]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectCountry = (country) => {
    setForm({
      ...form,
      country_iso: country.iso,
      country_code: country.code,
    });
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.includes(searchTerm)
  );

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { country_iso, ...payload } = form;

    const url = isEdit
      ? `http://localhost:5000/api/admin/update-admin/${id}`
      : `http://localhost:5000/api/admin/save-admin`;

    const method = isEdit ? "PUT" : "POST";

    // 🔐 if edit & password empty → don’t send password
    if (isEdit && !payload.password) {
      delete payload.password;
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      navigate("/admin/admin-list");
    } else {
      alert("Failed to save admin");
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">
          {isEdit ? "Edit Admin" : "Create Admin"}
        </h1>
        <p className="page-subtitle">
          {isEdit
            ? "Update administrator details"
            : "Add a new administrator"}
        </p>
      </div>

      <form className="full-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Admin Type</label>
              <select
                name="admin_type"
                className="form-control"
                value={form.admin_type}
                onChange={handleChange}
                required
              >
                <option value="">Select Admin</option>
                <option value="1">Super Admin</option>
                <option value="2">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="form-control"
                disabled={isEdit}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                disabled={isEdit}
                required
              />
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label>Phone Number</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{ position: "relative", width: "110px" }}
                  ref={dropdownRef}
                >
                  <div
                    className="form-control"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${form.country_iso}.png`}
                      alt=""
                    />
                    <span>{form.country_code}</span>
                    <span style={{ marginLeft: "auto", fontSize: "10px" }}>
                      ▼
                    </span>
                  </div>

                  {isOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        width: "280px",
                        background: "#fff",
                        border: "1px solid #ddd",
                        zIndex: 100,
                        marginTop: "4px",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search country or code"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                      />

                      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {filteredCountries.map((c) => (
                          <div
                            key={c.iso}
                            onClick={() => handleSelectCountry(c)}
                            style={{
                              padding: "8px",
                              cursor: "pointer",
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            <img
                              src={`https://flagcdn.com/w20/${c.iso}.png`}
                              alt=""
                            />
                            <span style={{ flex: 1 }}>{c.name}</span>
                            <span>{c.code}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Password {isEdit && <small>(leave blank to keep same)</small>}
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                required={!isEdit}
              />
            </div>
          </div>
        </div>

        <div className="form-actions sticky-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/admin/admin-list")}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {isEdit ? "Update Admin" : "Create Admin"}
          </button>
        </div>
      </form>
    </div>
  );
}
