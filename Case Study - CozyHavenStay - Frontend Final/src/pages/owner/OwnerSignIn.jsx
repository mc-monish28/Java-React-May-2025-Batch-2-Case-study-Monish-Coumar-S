import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerNavbar from "../../components/OwnerNavbar";
import rightSvg from "../../assets/right.svg";
import { login as loginApi } from "../../api/auth";
import toast, { Toaster } from "react-hot-toast";
import PrimeLogo from "../../assets/Prime-logo.png";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  light: "#f8f9fa"
};

function OwnerSignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "E-mail is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid e-mail.";
    if (!form.password) errs.password = "Password is required.";
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        const data = await loginApi({ email: form.email, password: form.password });
        if (data.userDto && data.userDto.role === "HOTEL_OWNER") {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.userDto));
          toast.success("Login successful!");
          setTimeout(() => navigate("/hotel-owner-dashboard"), 1200);
        } else {
          toast.error("Only hotel owners can log in here.");
        }
      } catch (err) {
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.light }}>
      <Toaster position="top-center" />
      <OwnerNavbar />
      <div className="d-flex flex-lg-row flex-column" style={{ minHeight: "100vh" }}>
        {/* Left: Form */}
        <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ background: COLORS.light, minHeight: 600 }}>
          <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 420, padding: "48px 0 24px 0" }}>
            <div className="mb-4 text-center">
              <img src={PrimeLogo} alt="Cozy Haven Stay Logo" style={{ height: 48, width: 'auto', marginBottom: 8 }} />
            </div>
            <div className="fw-bold mb-4" style={{ fontSize: 32, color: COLORS.tertiary, fontFamily: 'Urbanist, Nunito Sans, Segoe UI, Arial, sans-serif' }}>Hotel Owner Sign in</div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Email ID</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                style={{ fontSize: 18, borderRadius: 12, border: `1.5px solid ${COLORS.light}`, boxShadow: "0 1px 4px #0a2c4508" }}
                autoComplete="username"
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            {/* Password */}
            <div className="mb-4 position-relative">
              <label htmlFor="password" className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                  style={{ fontSize: 18, borderRadius: 12, border: `1.5px solid ${COLORS.light}`, boxShadow: "0 1px 4px #0a2c4508" }}
                  autoComplete="current-password"
                  required
                />
                <button type="button" className="btn" style={{ border: 0, background: "none", position: "absolute", right: 8, top: 8, padding: 0 }} onClick={() => setShowPassword(s => !s)} tabIndex={-1} aria-label="Show/Hide Password">
                  {/* AI icon for show/hide password */}
                  <span role="img" aria-label="AI" style={{ fontSize: 22, color: COLORS.secondary, opacity: 0.8 }}>🤖</span>
                </button>
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            {/* Sign in button */}
            <button type="submit" className="btn w-100 py-2 fw-bold" style={{ background: COLORS.secondary, color: COLORS.primary, fontSize: 18, borderRadius: 12 }} disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
        {/* Right: Orange with SVG and Floating Quote */}
        <div className="d-none d-lg-flex flex-column align-items-center justify-content-center" style={{ flex: 1, background: COLORS.secondary, minHeight: 600, position: "relative", overflow: "hidden" }}>
          {/* Floating Quote */}
          <div style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.92)',
              color: COLORS.tertiary,
              borderRadius: 18,
              boxShadow: '0 4px 24px #0a2c4520',
              padding: '22px 36px',
              fontSize: 22,
              fontWeight: 700,
              maxWidth: 420,
              textAlign: 'center',
              fontFamily: 'Urbanist, Nunito Sans, Segoe UI, Arial, sans-serif',
              border: `2px solid ${COLORS.secondary}30`,
              letterSpacing: 0.2,
            }}>
              "Manage your hotels effortlessly and watch your profits grow—our SaaS platform empowers you to succeed."
            </div>
            {/* Normal text below the quote, over the image */}
            <div style={{
              marginTop: 28,
              color: COLORS.primary,
              fontWeight: 800,
              fontSize: 28,
              textShadow: '0 2px 12px #0a2c4540',
              fontFamily: 'Urbanist, Nunito Sans, Segoe UI, Arial, sans-serif',
              letterSpacing: 0.5,
              opacity: 0.98,
            }}>
              Cozy Haven Stay for Owners
            </div>
          </div>
          <img src={rightSvg} alt="Orange Accent" style={{ position: "absolute", right: 0, top: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.95, zIndex: 1 }} />
        </div>
      </div>
    </div>
  );
}

export default OwnerSignIn; 