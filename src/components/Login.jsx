import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // ✅ clear old messages

    try {
      const res = await API.post("/auth/login", { email, password });
      setMessage(res.data.msg);

      if (res.data.token) {
        // ✅ Save token
        localStorage.setItem("token", res.data.token);

        // ✅ Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-box"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(""); // ✅ reset error on typing
            }}
            className="form-control"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage(""); // ✅ reset error on typing
            }}
            className="form-control"
            required
            autoComplete="current-password"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
          >
            Login
          </motion.button>
        </form>

        {/* ✅ Forgot Password link */}
        <p className="mt-3">
          <Link
            to="/forgot-password"
            style={{ color: "#ffeb3b", fontWeight: "bold", textDecoration: "underline" }}
          >
            Forgot Password?
          </Link>
        </p>

        {/* ✅ Register link */}
        <p className="mt-3">
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#fff", fontWeight: "bold", textDecoration: "underline" }}
          >
            Register here
          </Link>
        </p>

        {message && <p className="mt-3">{message}</p>}
      </motion.div>
    </div>
  );
}

export default Login;
