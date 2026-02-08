import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { countries } from "../../config/countries";

export default function ProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { email } = useParams(); // 👈 edit mode

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState(
    "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
  );

  const [form, setForm] = useState({
    admin_img:"",
    name: "",
    email: "",
    username: "",
    country_code: "+91",
    country_iso: "in",
    phone_number: "",
    password: "",
  });

  /* ---------------- CLOSE DROPDOWN ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- FETCH PROFILE ---------------- */
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error("Failed to fetch profile");

      setForm({
        admin_img: result.data.admin_img || "",
        name: result.data.name || "",
        email: result.data.email || "",
        username: result.data.username || "",
        country_code: result.data.country_code || "+91",
        country_iso: result.data.country_iso || "in",
        phone_number: result.data.phone_number || "",
        password: "",
      });

      if (result.data.admin_img) setAvatar(`http://localhost:5000${result.data.admin_img}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     setAvatarFile(e.target.files[0]);
  //     setAvatar(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const handleAvatarChange = (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  setAvatarFile(file);
  setAvatar(URL.createObjectURL(file)); // 🔥 instant preview
};


  const handleSelectCountry = (country: any) => {
    setForm({
      ...form,
      country_iso: country.iso,
      country_code: country.code,
    });
    setIsOpen(false);
    setSearchTerm("");
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (avatarFile) {
        formData.append("admin_img", avatarFile);
      }

      const res = await fetch(`http://localhost:5000/api/admin/profile-update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.includes(searchTerm)
  );

  if (loading) return <p style={{ padding: "20px" }}>Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Edit Profile</h2>

        {/* Avatar */}
        <div className="avatar-wrapper">
          <img src={avatar} alt="Avatar" />
          <label className="avatar-btn">
            Change
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </label>
        </div>

        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input value={form.email} disabled />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input value={form.username} disabled />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone Number</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <div ref={dropdownRef} style={{ position: "relative", width: "120px" }}>
              <div
                className="form-control"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: "pointer", display: "flex", gap: "8px" }}
              >
                <img src={`https://flagcdn.com/w20/${form.country_iso}.png`} />
                <span>{form.country_code}</span>
                <span style={{ marginLeft: "auto" }}>▼</span>
              </div>

              {isOpen && (
                <div className="country-dropdown">
                  <input
                    className="form-control"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <div className="country-list">
                    {filteredCountries.map((c) => (
                      <div key={c.iso} onClick={() => handleSelectCountry(c)}>
                        <img src={`https://flagcdn.com/w20/${c.iso}.png`} />
                        <span>{c.name}</span>
                        <span>{c.code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <input
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Leave blank to keep password"
            onChange={handleChange}
          />
        </div>

        <button className="save-btn" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
