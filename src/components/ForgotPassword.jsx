import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // clear old messages

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.msg || "Reset link sent to your email!");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error sending reset email.");
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
        <h2>Forgot Password</h2>
        <p className="mb-3">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(""); // reset error on typing
            }}
            className="form-control"
            required
            autoComplete="email"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
          >
            Send Reset Link
          </motion.button>
        </form>

        {message && <p className="mt-3">{message}</p>}
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
