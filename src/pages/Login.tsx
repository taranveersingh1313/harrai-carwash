import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 Replace with API call
    console.log({ email, password });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Admin</h2>
        <p>Please login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <div className="login-footer">
          <a href="#forgot-password">Forgot password?</a>
          {/* <span>
            Don’t have an account? <a href="#">Sign up</a>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
