import React, { useState, useEffect } from "react";
import { FaStar, FaCog, FaHotel, FaBed, FaCommentDots, FaList, FaChevronDown, FaClipboardList } from "react-icons/fa";
import HotelCardLogo from '../../assets/HotelcardLogo.png';

import OwnerHotelsView from './OwnerHotelsView';
import OwnerRoomManagementView from './OwnerRoomManagementView';
import OwnerSettingsView from './OwnerSettingsView';
import OwnerFeedbackView from './OwnerFeedbackView';
import OwnerTermsView from './OwnerTermsView';
import OwnerNewBookingsView from './OwnerNewBookingsView';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  sidebar: "#f8f9fa",
  darkBlue: "#0a2c45",
};

const hotel = {
  name: "CIBO Fine Dining",
  rating: 4.5,
  location: "Thiruvanmiyur, Chennai",
  type: "Restaurant",
  roomsAvailable: 2,
  image: HotelCardLogo,
};

const navItems = [
  
  { label: "Hotels", icon: <FaHotel /> },
  { label: "Room Management", icon: <FaBed /> },
  { label: "View Bookings", icon: <FaClipboardList /> },
];
const menuItems = [
  { label: "Settings", icon: <FaCog /> },
  { label: "Feedback", icon: <FaCommentDots /> },
  { label: "Terms & Condition", icon: <FaList /> },
];

const TAB_COMPONENTS = {
  
  Hotels: OwnerHotelsView,
  'Room Management': OwnerRoomManagementView,
  'View Bookings': OwnerNewBookingsView,
  Settings: OwnerSettingsView,
  Feedback: OwnerFeedbackView,
  'Terms & Condition': OwnerTermsView,
};

export default function HotelOwnerDashboard() {
  const [activeTab, setActiveTab] = useState('Hotels');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Cozy Haven Stay - Owner Portal';
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/HotelcardLogo.png';
  }, []);

  // Fetch owner user name from localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {}
  const ownerInitial = user?.username ? user.username[0].toUpperCase() : 'O';

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/owner/signin');
  };

  // Determine which component to render
  const ActiveComponent = TAB_COMPONENTS[activeTab] || (() => null);

  return (
    <div style={{ minHeight: '100vh', background: COLORS.primary, fontFamily: 'Urbanist, Nunito Sans, Segoe UI, Arial, sans-serif' }}>
      {/* Top Bar */}
      <div className="d-flex align-items-center justify-content-between px-4 py-2" style={{ background: COLORS.primary, borderBottom: '1px solid #eee', minHeight: 64 }}>
        <div className="fw-bold" style={{ fontSize: 22, letterSpacing: 0.5 }}>
          <span style={{ color: COLORS.secondary }}>Cozy Haven</span> <span style={{ color: COLORS.tertiary }}>Stay</span> <span style={{ color: '#888', fontSize: 18, fontWeight: 600 }}>- For Owners</span>
        </div>
      </div>
      {/* Layout */}
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <aside style={{ width: 260, background: COLORS.sidebar, borderRight: '1px solid #eee', minHeight: '100%' }} className="d-flex flex-column p-0">
          {/* Hotel Selector */}
          <div className="d-flex align-items-center gap-2 px-4 py-3 position-relative" style={{ borderBottom: '1px solid #eee' }}>
            <span style={{ background: COLORS.tertiary, color: COLORS.primary, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, cursor: 'pointer' }} onClick={() => setDropdownOpen((open) => !open)}>
              {ownerInitial}
            </span>
            <div className="flex-grow-1">
              <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 16 }}>{user?.username || 'Owner'}</div>
              <div style={{ color: '#888', fontSize: 13 }}>Owner Account</div>
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
          {/* Nav */}
          <div className="px-0 pt-4 pb-2 flex-grow-1">
            <div className="px-3 mb-2" style={{ color: '#888', fontWeight: 700, fontSize: 13 }}>GENERAL</div>
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
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  );
} 