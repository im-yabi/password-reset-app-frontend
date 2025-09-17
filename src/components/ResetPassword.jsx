import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api";
import "./Auth.css";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error occurred");
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
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
          >
            Update Password
          </motion.button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </motion.div>
    </div>
  );
}

export default ResetPassword;
