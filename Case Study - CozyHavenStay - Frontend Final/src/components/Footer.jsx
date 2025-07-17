import React from "react";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

function Footer() {
  return (
    <footer className="w-100 py-3 px-2 mt-auto" style={{ background: COLORS.primary, borderTop: `1.5px solid ${COLORS.tertiary}15`, boxShadow: '0 -2px 16px 0 rgba(10,44,69,0.04)', fontSize: 15 }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <span style={{ color: '#888' }}>
          © {new Date().getFullYear()} Copyrights by{' '}
          <span style={{ color: COLORS.tertiary, fontWeight: 700 }}>Cozy Haven Stay</span> All Rights Reserved.
        </span>
        <span className="d-none d-md-inline" style={{ color: COLORS.secondary, fontWeight: 600, letterSpacing: 1 }}>
          Premium Hotel Booking Platform
        </span>
      </div>
    </footer>
  );
}

export default Footer; 