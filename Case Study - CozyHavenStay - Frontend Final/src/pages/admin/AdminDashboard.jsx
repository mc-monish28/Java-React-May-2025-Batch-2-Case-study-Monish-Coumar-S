import React, { useState, useEffect } from "react";
import { FaCog, FaCommentDots, FaTachometerAlt, FaUserTie, FaHotel, FaChevronDown, FaUsers } from "react-icons/fa";
import AdminNavbar from "../../components/AdminNavbar";
import OwnerSettingsView from "../owner/OwnerSettingsView";
import OwnerFeedbackView from "../owner/OwnerFeedbackView";
import HotelOwnersView from "./HotelOwnersView";
import ManageHotelsView from "./ManageHotelsView";
import { useNavigate } from "react-router-dom";
import { getAdminStatistics } from "../../api/admin";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  sidebar: "#f8f9fa",
  darkBlue: "#0a2c45",
};

const navItems = [
  { label: "Manage Dashboard", icon: <FaTachometerAlt /> },
  { label: "Hotel Owners", icon: <FaUserTie /> },
  { label: "Manage Hotels", icon: <FaHotel /> },
];
const menuItems = [
  { label: "Settings", icon: <FaCog /> },
  { label: "Feedback", icon: <FaCommentDots /> },
];

function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAdminStatistics()
      .then(setStats)
      .catch((err) => setError(err.message || "Failed to load statistics"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="row g-4 mb-4">
      {loading ? (
        <div className="text-center w-100 py-5">Loading statistics...</div>
      ) : error ? (
        <div className="alert alert-danger w-100 text-center">{error}</div>
      ) : stats ? (
        <>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 d-flex flex-column align-items-center" style={{ background: COLORS.primary, border: '1.5px solid #e0e6ed', minHeight: 120 }}>
              <FaUsers style={{ color: COLORS.secondary, fontSize: 32, marginBottom: 8 }} />
              <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 22 }}>Total Users</div>
              <div style={{ color: COLORS.secondary, fontWeight: 800, fontSize: 28 }}>{stats.totalUsers}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 d-flex flex-column align-items-center" style={{ background: COLORS.primary, border: '1.5px solid #e0e6ed', minHeight: 120 }}>
              <FaUserTie style={{ color: COLORS.secondary, fontSize: 32, marginBottom: 8 }} />
              <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 22 }}>Hotel Owners</div>
              <div style={{ color: COLORS.secondary, fontWeight: 800, fontSize: 28 }}>{stats.totalHotelOwners}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 d-flex flex-column align-items-center" style={{ background: COLORS.primary, border: '1.5px solid #e0e6ed', minHeight: 120 }}>
              <FaHotel style={{ color: COLORS.secondary, fontSize: 32, marginBottom: 8 }} />
              <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 22 }}>Total Hotels</div>
              <div style={{ color: COLORS.secondary, fontWeight: 800, fontSize: 28 }}>{stats.totalHotels}</div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

const TAB_COMPONENTS = {
  'Manage Dashboard': DashboardStats,
  'Hotel Owners': HotelOwnersView,
  'Manage Hotels': ManageHotelsView,
  Settings: OwnerSettingsView,
  Feedback: OwnerFeedbackView,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Manage Dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch admin user name from localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}
  const adminInitial = user?.username ? user.username[0].toUpperCase() : 'A';

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

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

  const ActiveComponent = TAB_COMPONENTS[activeTab] || (() => null);

  return (
    <div style={{ minHeight: '100vh', background: COLORS.primary, fontFamily: 'Urbanist, Nunito Sans, Segoe UI, Arial, sans-serif' }}>
      <AdminNavbar />
      {/* Layout */}
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <aside style={{ width: 260, background: COLORS.sidebar, borderRight: '1px solid #eee', minHeight: '100%' }} className="d-flex flex-column p-0">
          {/* Admin Selector */}
          <div className="d-flex align-items-center gap-2 px-4 py-3 position-relative" style={{ borderBottom: '1px solid #eee' }}>
            <span style={{ background: COLORS.tertiary, color: COLORS.primary, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, cursor: 'pointer' }} onClick={() => setDropdownOpen((open) => !open)}>
              {adminInitial}
            </span>
            <div className="flex-grow-1">
              <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 16 }}>{user?.username || 'Admin'}</div>
              <div style={{ color: '#888', fontSize: 13 }}>Admin Account</div>
            </div>
            <FaChevronDown style={{ color: COLORS.tertiary, fontSize: 18, cursor: 'pointer' }} onClick={() => setDropdownOpen((open) => !open)} />
            {/* Dropdown */}
            {dropdownOpen && (
              <div style={{ position: 'absolute', top: 56, left: 0, background: COLORS.primary, boxShadow: '0 4px 16px #0a2c4520', border: `1px solid ${COLORS.tertiary}22`, borderRadius: 10, minWidth: 160, zIndex: 10 }}>
                <button className="dropdown-item" style={{ color: COLORS.secondary, fontWeight: 700, fontSize: 16, padding: '12px 20px', background: 'none', border: 'none', width: '100%', textAlign: 'left' }} onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
          <div className="px-0 pt-4 pb-2 flex-grow-1">
            <div className="px-3 mb-2" style={{ color: '#888', fontWeight: 700, fontSize: 13 }}>ADMIN</div>
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`d-flex align-items-center px-4 py-2 mb-1 rounded-3 ${activeTab === item.label ? 'bg-white shadow-sm' : ''}`}
                style={{ cursor: 'pointer', color: activeTab === item.label ? COLORS.tertiary : '#444', fontWeight: activeTab === item.label ? 700 : 500, fontSize: 16, border: activeTab === item.label ? `1.5px solid ${COLORS.secondary}30` : 'none', transition: 'background 0.2s' }}
                onClick={() => setActiveTab(item.label)}
              >
                <span className="me-3" style={{ fontSize: 18 }}>{item.icon}</span> {item.label}
              </div>
            ))}
            <div className="px-3 mt-4 mb-2" style={{ color: '#888', fontWeight: 700, fontSize: 13 }}>MENU</div>
            {menuItems.map((item) => (
              <div
                key={item.label}
                className={`d-flex align-items-center px-4 py-2 mb-1 rounded-3 ${activeTab === item.label ? 'bg-white shadow-sm' : ''}`}
                style={{ cursor: 'pointer', color: activeTab === item.label ? COLORS.tertiary : '#444', fontWeight: activeTab === item.label ? 700 : 500, fontSize: 16, border: activeTab === item.label ? `1.5px solid ${COLORS.secondary}30` : 'none', transition: 'background 0.2s' }}
                onClick={() => setActiveTab(item.label)}
              >
                <span className="me-3" style={{ fontSize: 18 }}>{item.icon}</span> {item.label}
              </div>
            ))}
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-grow-1" style={{ background: COLORS.primary, minHeight: '100%', padding: '32px 0 0 0' }}>
          <div className="px-5">
            {activeTab === 'Manage Dashboard' && (
              <h1 style={{ fontSize: 32, color: COLORS.tertiary, marginBottom: 32, fontWeight: 800 }}>Dashboard</h1>
            )}
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  );
} 