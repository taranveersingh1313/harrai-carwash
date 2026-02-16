import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your account</p>

        {error && <p className="error">{error}</p>}

        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="login-options">
          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>

          <Link to="/forgot-password" className="forgot">
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <div className="signup-link">
          Don’t have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
