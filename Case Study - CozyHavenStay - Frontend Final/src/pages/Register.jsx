import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import registerImg from "../assets/Register.svg";
import PrimeLogo from "../assets/Prime-logo.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { register as registerApi } from "../api/auth";
import toast, { Toaster } from "react-hot-toast";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

function Register() {
  const [form, setForm] = useState({ username: "", phoneNumber: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await registerApi({ username: form.username, password: form.password, email: form.email, phoneNumber: form.phoneNumber });
      toast.success("Registered Successfully! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.message && err.message.includes("Email Already Exists")) {
        toast.error("Email already exists. Please use a different email or login.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar isLoggedIn={false} />
      <div className="min-vh-100 d-flex align-items-stretch" style={{ background: "#fdf7f2" }}>
        {/* Left Illustration */}
        <div className="d-none d-md-flex col-md-6 align-items-center justify-content-center p-0" style={{ background: "#fdf7f2" }}>
          <img src={registerImg} alt="Register Illustration" className="img-fluid" style={{ maxHeight: "80vh", width: "100%", objectFit: "contain" }} />
        </div>
        {/* Right Form */}
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center bg-white px-4 px-md-5" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: 400 }}>
            {/* Logo and Title */}
            <div className="text-center mb-4">
              <img src={PrimeLogo} alt="Cozy Haven Stay Logo" style={{ height: 48, width: 'auto', marginBottom: 8 }} />
            </div>
            <h3 className="fw-bold mb-2 text-center" style={{ color: COLORS.tertiary }}>Sign Up</h3>
            <p className="text-center mb-4" style={{ color: '#888', fontSize: 15 }}>Create your review management account here.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Username</label>
                <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} placeholder="Enter here" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Phone number</label>
                <input type="text" className="form-control" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Enter phone number" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Email ID</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Password</label>
                <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Confirm Password</label>
                <input type="password" className="form-control" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Enter your password again" required />
              </div>
              <button type="submit" className="btn w-100 py-2 fw-bold" style={{ background: COLORS.secondary, color: COLORS.primary, fontSize: 18, borderRadius: 12 }} disabled={loading}>
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>
            <div className="text-center mt-3" style={{ fontSize: 15 }}>
              Already a user?{' '}
              <Link to="/login" style={{ color: COLORS.secondary, fontWeight: 700, textDecoration: 'none' }}>
                Login here
              </Link>
            </div>
            <div className="text-center mt-5" style={{ color: '#888', fontSize: 13 }}>
              © 2025 Copyrights by <span style={{ color: COLORS.tertiary, fontWeight: 700 }}>Cozy Haven Stay</span> All Rights Reserved.
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Register; 