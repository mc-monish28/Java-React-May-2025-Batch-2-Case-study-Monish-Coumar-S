import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  light: "#f8f9fa"
};

function Profile() {
  const navigate = useNavigate();
  // Get userDto from localStorage (assume it's stored as JSON string under 'userDto')
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div style={{ background: COLORS.light, minHeight: "100vh" }}>
        <section className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="w-100" style={{ maxWidth: 420 }}>
            <h2 className="fw-bold mb-2 text-center" style={{ color: COLORS.tertiary, fontSize: 30 }}>
              My Profile
            </h2>
            <div style={{ width: 70, height: 4, background: `linear-gradient(90deg, ${COLORS.secondary} 0%, ${COLORS.tertiary} 100%)`, borderRadius: 4, margin: '0.5rem auto 2rem' }} />
            {!user ? (
              <div className="alert alert-warning text-center">User details not found. Please log in again.</div>
            ) : (
              <div className="rounded-4 p-4 mb-4 shadow-sm" style={{ background: COLORS.primary, boxShadow: '0 4px 24px #0a2c4510', border: '1px solid rgba(0,0,0,0.10)' }}>
                <div className="mb-3 text-center">
                  <div className="rounded-circle mx-auto mb-2" style={{ width: 64, height: 64, background: COLORS.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.primary, fontWeight: 800, fontSize: 32 }}>
                    {user.username ? user.username[0].toUpperCase() : "U"}
                  </div>
                  <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 22 }}>{user.username}</div>
                  <div className="text-muted" style={{ fontSize: 15 }}>{user.role}</div>
                </div>
                <hr className="my-3" />
                <div className="mb-2" style={{ color: COLORS.tertiary, fontWeight: 600 }}>
                  <span style={{ opacity: 0.7 }}>Email:</span> {user.email}
                </div>
                <div className="mb-2" style={{ color: COLORS.tertiary, fontWeight: 600 }}>
                  <span style={{ opacity: 0.7 }}>Phone:</span> {user.phoneNumber}
                </div>
              </div>
            )}
            <button className="btn btn-premium w-100 py-2" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 16, fontSize: 18 }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Profile; 