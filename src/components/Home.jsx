import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";  // 🔒 lock icon
import "./Home.css";

function Home() {
  return (
    <div className="home-container d-flex align-items-center justify-content-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Logo */}
        <motion.div
          className="logo-container"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <FaLock className="logo-icon" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="title"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          🔑 Welcome to Password Reset App
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Securely manage your account
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="button-group mt-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 }
            }
          }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login" className="btn btn-gradient me-3">Login</Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/register" className="btn btn-gradient me-3">Register</Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/forgot-password" className="btn btn-gradient">Forgot Password</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
