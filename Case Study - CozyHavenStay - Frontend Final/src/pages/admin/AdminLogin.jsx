import React, { useState, useEffect } from "react";
import AdminLoginSVG from "../../assets/adminLogin.svg";
import { adminLogin } from "../../api/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff",
  dark: "#222",
  border: "#e0e6ed"
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Cozy Haven Stay - Admin Portal';
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/HotelcardLogo.png';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await adminLogin({ email, password });
      if (data.userDto && data.userDto.role === "ADMIN") {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.userDto));
        toast.success("Admin login successful!");
        setTimeout(() => navigate("/admin/dashboard"), 1200);
      } else {
        toast.error("Only admins can log in here.");
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'row', boxSizing: 'border-box' }}>
      <Toaster position="top-center" />
      {/* Left: Form */}
      <div style={{ flex: '0 0 40%', maxWidth: '40%', minWidth: 380, background: COLORS.primary, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box', height: '100vh' }}>
        <div style={{ width: 400, maxWidth: '90%', padding: '40px 0 40px 0', margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: 0.5, lineHeight: 1.1 }}>
              <span style={{ color: COLORS.secondary }}>Cozy Haven</span> <span style={{ color: COLORS.tertiary }}>Stay</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.secondary, marginTop: 8, lineHeight: 1.1 }}>
              Admin Portal <span style={{ color: COLORS.dark, fontWeight: 700 }}>Login</span>
            </div>
            <div style={{ color: '#444', fontSize: 15, marginTop: 12, marginBottom: 24, fontWeight: 400 }}>
              Login to access your Cozy Haven Stay Admin account
            </div>
          </div>
          <form style={{ width: '100%' }} onSubmit={handleSubmit} autoComplete="off">
            <div style={{ marginBottom: 18 }}>
              <label style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 15, marginBottom: 6, display: 'block' }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: 16, padding: '12px 16px', width: '100%', outline: 'none', marginBottom: 0 }}
                required
                disabled={loading}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 15, marginBottom: 6, display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: 16, padding: '12px 16px', paddingRight: 44, width: '100%', outline: 'none' }}
                  required
                  disabled={loading}
                />
                <span
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888', fontSize: 20 }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
              <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ marginRight: 8, accentColor: COLORS.secondary, width: 16, height: 16 }} disabled={loading} />
              <label htmlFor="remember" style={{ color: COLORS.tertiary, fontWeight: 500, fontSize: 15, cursor: 'pointer', userSelect: 'none' }}>Remember me</label>
            </div>
            <button type="submit" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 8, fontSize: 18, padding: '13px 0', width: '100%', border: 'none', outline: 'none', boxShadow: 'none', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s' }} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
      {/* Right: Illustration */}
      <div style={{ flex: '0 0 60%', maxWidth: '60%', minWidth: 500, background: '#ffe3c4', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', boxSizing: 'border-box' }}>
        <img
          src={AdminLoginSVG}
          alt="Admin Login Illustration"
          style={{ maxWidth: 700, width: '80%', height: 'auto', display: 'block', marginLeft: 0 }}
        />
      </div>
    </div>
  );
} 