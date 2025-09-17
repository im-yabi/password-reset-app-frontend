import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api";
import "./Auth.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err.response?.data || err.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="auth-container">
        <motion.div
          className="auth-box text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>Loading profile...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <motion.div
        className="auth-box text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Avatar */}
        <div className="avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="mb-3">👤 Profile</h2>
        <hr style={{ borderColor: "rgba(0,0,0,0.2)" }} />

        {/* User details */}
        <div className="profile-details">
          <p><strong>👤 Name:</strong> {user.name}</p>
          <p><strong>🎂 Age:</strong> {user.age || "N/A"}</p>
          <p><strong>📅 DOB:</strong> {user.dob ? new Date(user.dob).toDateString() : "N/A"}</p>
          <p><strong>💼 Occupation:</strong> {user.occupation || "N/A"}</p>
          <p><strong>🎓 Education:</strong> {user.education || "N/A"}</p>
          <p><strong>📧 Email:</strong> {user.email}</p>
        </div>

        {/* Logout button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-gradient mt-3"
          onClick={handleLogout}
        >
          🚪 Logout
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Profile;
