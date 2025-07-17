import React from "react";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45"
};

export default function AdminNavbar() {
  return (
    <nav style={{ width: '100%', background: COLORS.primary, borderBottom: `2.5px solid ${COLORS.secondary}`, boxShadow: '0 2px 8px rgba(10,44,69,0.07)', padding: '0 0 0 0', minHeight: 64, display: 'flex', alignItems: 'center', fontFamily: 'Nunito Sans, Segoe UI, Arial, sans-serif' }}>
      <div style={{ fontWeight: 900, fontSize: 28, color: COLORS.tertiary, letterSpacing: 1.2, padding: '0 32px', flex: 1, display: 'flex', alignItems: 'center', height: 64 }}>
        <span style={{ color: COLORS.secondary }}>Cozy Haven Stay</span>
        <span style={{ color: COLORS.tertiary, marginLeft: 12, fontWeight: 800 }}>- Admin Portal</span>
      </div>
      {/* Welcome message */}
      <div style={{ padding: '0 32px', fontSize: 18, fontWeight: 600, color: COLORS.tertiary }}>
        {(() => {
          let user = null;
          try {
            user = JSON.parse(localStorage.getItem('user'));
          } catch {}
          const username = user?.username || 'Admin';
          return (
            <span>
              Welcome Back, <span style={{ color: COLORS.secondary, fontWeight: 800 }}>{username}</span>
            </span>
          );
        })()}
      </div>
    </nav>
  );
} 