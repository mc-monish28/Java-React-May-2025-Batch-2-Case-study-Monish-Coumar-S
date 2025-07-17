import React from "react";
import { Link, NavLink } from "react-router-dom";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

const OwnerNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: COLORS.primary, boxShadow: "0 2px 8px rgba(10,44,69,0.05)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/owner" style={{ fontSize: 24, letterSpacing: 1.2, fontWeight: 900, fontFamily: 'Nunito Sans, Segoe UI, Arial, sans-serif' }}>
          <span style={{ color: COLORS.secondary }}>Cozy Haven Stay</span>
          <span style={{ color: COLORS.tertiary, marginLeft: 8, fontSize: 18, fontWeight: 700 }}>- Owner Portal</span>
        </Link>
        <div className="d-flex align-items-center gap-4 ms-auto">
          <NavLink to="/owner" className="nav-link fw-semibold" style={{ color: COLORS.tertiary }}>
            Home
          </NavLink>
          <NavLink to="/owner/signin" className="nav-link fw-semibold" style={{ color: COLORS.tertiary }}>
            Sign In
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavbar; 