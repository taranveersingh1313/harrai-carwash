// import React, { useState } from "react";
// import "../assets/css/admin.css";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2>Welcome Admin</h2>
//         <p>Please login to your account</p>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn-login">
//             Login
//           </button>
//         </form>

//         <div className="login-footer">
//           <a href="#forgot-password">Forgot password?</a>
//           {/* <span>
//             Don’t have an account? <a href="#">Sign up</a>
//           </span> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/admin.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //  alert("SUBMIT FIRED");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      // console.log("API RESPONSE:", data);
      // console.log("API RESPONSE:", response);

      if (!response.ok || response.status !== 200) {
        throw new Error(data.message || "Invalid credentials");
      }

      // ✅ Save auth data
      localStorage.setItem("token", data.token);

      console.log("TOKEN:", localStorage.getItem("token"));

      console.log("here");


      // console.log("TOKEN SAVED:", localStorage.getItem("token"));


      // 🚀 Redirect to dashboard
      navigate("/admin/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Admin</h2>
        <p>Please login to your account</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Or Username</label>
            <input
              type="text"
              placeholder="Enter your email or username"
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

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <a href="#forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
