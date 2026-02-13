
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { countries } from "../../config/countries";
import { BASE_URL } from "../../config/apiConfig";

export default function CreateCustomer() {
    const navigate = useNavigate();
    const { id } = useParams(); // 👈 edit mode
    const isEdit = Boolean(id);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        country_code: "+91",
        country_iso: "in",
        phone_no: "",
        password: "",
        is_verified: 1,
        address: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
        created_by: "",
        updated_by: "",
        status: "1",
    });

    /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ---------------- FETCH ADMIN WHEN EDIT ---------------- */
    useEffect(() => {
        if (!isEdit) return;

        const fetchCustomer = async () => {
            const res = await fetch(
                `${BASE_URL}/admin/edit-customer/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await res.json();

            console.log("Fetched customer data:", data);

            if (data.success) {
                console.log("Fetched customer data success:", data.success);
                setForm({
                    name: data.data.name,
                    email: data.data.email,
                    is_verified: data.data.is_verified,
                    country_code: data.data.country_code,
                    country_iso: data.data.country_iso || "in",
                    phone_no: data.data.phone_no,
                    address: data.data.address,
                    zip_code: data.data.zip_code,
                    city: data.data.city,
                    state: data.data.state,
                    country: data.data.country,
                    created_by: data.data.created_by,
                    updated_by: data.data.updated_by,
                    password: "",
                    status: data.data.status,
                });
            }
        };

        fetchCustomer();
    }, [id, isEdit]);

    /* ---------------- HANDLERS ---------------- */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectCountry = (country: { iso: string; code: string; name: string }) => {
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const { country_iso, ...payload } = form;
        const { country_iso, ...rest } = form;
        const payload: Record<string, any> = { ...rest };

        const url = isEdit
            ? `${BASE_URL}/admin/update-customer/${id}`
            : `${BASE_URL}/admin/save-customer`;

        const method = isEdit ? "PUT" : "POST";

        // 🔐 if edit & password empty → don’t send password
        if (isEdit && !payload?.password) {
            delete payload?.password;
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
            navigate("/admin/customer-list");
        } else {
            alert("Failed to save customer");
        }
    };

    /* ===================== UI ===================== */
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1 className="page-title">
                    {isEdit ? "Edit Customer" : "Create Customer"}
                </h1>
                <p className="page-subtitle">
                    {isEdit
                        ? "Update customer details"
                        : "Add a new customer"}
                </p>
            </div>

            <form className="full-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3 className="section-title">Basic Information</h3>

                    <div className="form-grid">

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
                                                color: "#000 !important"
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
                                    name="phone_no"
                                    value={form.phone_no}
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

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="form-control"
                                // disabled={isEdit}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input
                                type="text"
                                name="zip_code"
                                value={form.zip_code}
                                onChange={handleChange}
                                className="form-control"
                                // disabled={isEdit}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="form-control"
                                // disabled={isEdit}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="form-control"
                                // disabled={isEdit}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className="form-control"
                                // disabled={isEdit}
                                required
                            />
                        </div>




                        {isEdit && (
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    className="form-control"
                                    value={form.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-actions sticky-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/admin/customer-list")}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        {isEdit ? "Update Customer" : "Create Customer"}
                    </button>
                </div>
            </form>
        </div>
    );
}
