import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import loginImg from "../assets/Login.svg";
import PrimeLogo from "../assets/Prime-logo.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { login as loginApi } from "../api/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginApi({ email: form.email, password: form.password });
      if (data.userDto && data.userDto.role === "CUSTOMER") {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.userDto));
        toast.success("Login successful!");
        setTimeout(() => navigate("/"), 1200);
      } else {
        toast.error("Only customers can log in here.");
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div className="min-vh-100 d-flex flex-column justify-content-between align-items-center" style={{ background: "#fdf7f2", position: 'relative' }}>
        {/* Background Illustration */}
        <img src={loginImg} alt="Login Illustration" className="position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover', zIndex: 0, opacity: 0.35, pointerEvents: 'none' }} />
        {/* Centered Card */}
        <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '90vh', zIndex: 1, position: 'relative' }}>
          <div className="bg-white p-4 p-md-5 rounded-4 shadow" style={{ maxWidth: 420, width: '100%', border: `1.5px solid ${COLORS.tertiary}22` }}>
            <div className="text-center mb-4">
              <img src={PrimeLogo} alt="Cozy Haven Stay Logo" style={{ height: 48, width: 'auto', marginBottom: 8 }} />
            </div>
            <h3 className="fw-bold mb-2 text-center" style={{ color: COLORS.tertiary }}>Sign In</h3>
            <p className="text-center mb-4" style={{ color: '#888', fontSize: 15 }}>Use your Cozy Haven Stay account credentials to log in securely.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Email ID</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Password</label>
                <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
              </div>
              <button type="submit" className="btn w-100 py-2 fw-bold" style={{ background: COLORS.secondary, color: COLORS.primary, fontSize: 18, borderRadius: 12 }} disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Login; 