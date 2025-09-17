import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Auth.css"; // reuse your auth styles

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ clear token
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-box"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>🎉 Welcome to Dashboard</h2>
        <p className="mb-4">You are logged in successfully!</p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          {/* Example extra button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </motion.button>

          {/* Logout button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
