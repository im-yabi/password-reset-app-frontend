import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    occupation: "",
    education: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setMessage("Name, Email, and Password are required.");
      return;
    }

    try {
      const res = await API.post("/auth/register", formData);
      setMessage(res.data.msg);

      // ✅ Redirect if success
      navigate("/login");
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
            autoComplete="name"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
          />

          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="form-control"
          />

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="form-control"
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="form-control"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
            autoComplete="new-password"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
          >
            Register
          </motion.button>
        </form>

        {/* ✅ Login link */}
        <p className="mt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Login here
          </Link>
        </p>

        {message && <p className="mt-3">{message}</p>}
      </motion.div>
    </div>
  );
}

export default Register;
