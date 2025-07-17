import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import PrimeLogo from "../assets/Prime-logo.png";
import { Link, useNavigate, NavLink } from "react-router-dom";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
    const onStorage = () => {
      const updated = localStorage.getItem("user");
      setUser(updated ? JSON.parse(updated) : null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: COLORS.primary, boxShadow: "0 2px 8px rgba(10,44,69,0.05)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ padding: '0', marginRight: 12 }}>
          <img src={PrimeLogo} alt="Cozy Haven Stay Logo" style={{ height: 40, width: 'auto', display: 'block' }} />
        </Link>
        <div className="d-flex align-items-center gap-4 ms-auto">
          <NavLink to="/terms" className="nav-link" activeClassName="active">Terms & Conditions</NavLink>
          <NavLink to="/my-bookings" className="nav-link" activeClassName="active">My Bookings</NavLink>
          <Link to="/hotels" className="nav-link fw-semibold" style={{ color: COLORS.tertiary }}>
            Search Hotels
          </Link>
          {!user ? (
            <Link to="/register" className="nav-link fw-semibold" style={{ color: COLORS.tertiary }}>
              Login / Register
            </Link>
          ) : (
            <div className="d-flex align-items-center gap-2 position-relative" ref={dropdownRef}>
              <span className="fw-semibold" style={{ color: COLORS.tertiary }}>
                Welcome, {user.username}
              </span>
              <div style={{ position: "relative" }}>
                <span
                  className="d-inline-flex justify-content-center align-items-center"
                  style={{
                    background: COLORS.secondary,
                    color: COLORS.primary,
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: 'pointer',
                  }}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  {user.username?.[0]?.toUpperCase() || <FaUserCircle />}
                </span>
                <span style={{ color: COLORS.tertiary, marginLeft: 4, fontSize: 18, cursor: 'pointer' }} onClick={() => setDropdownOpen((open) => !open)}>
                  &#9660;
                </span>
                {dropdownOpen && (
                  <div className="dropdown-menu show mt-2" style={{ display: 'block', minWidth: 140, right: 0, left: 'auto', position: 'absolute', background: COLORS.primary, boxShadow: '0 4px 16px #0a2c4520', border: `1px solid ${COLORS.tertiary}22`, zIndex: 100 }}>
                    <button className="dropdown-item" style={{ color: COLORS.tertiary, fontWeight: 600 }} onClick={() => { setDropdownOpen(false); navigate('/profile'); }}>
                      Profile
                    </button>
                    <button className="dropdown-item" style={{ color: COLORS.secondary, fontWeight: 600 }} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 