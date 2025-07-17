import React, { useState } from "react";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff",
  border: "#e0e6ed"
};

const LANGUAGES = ["English", "Hindi", "French", "German"];
const TIMEZONES = ["Asia/Kolkata", "America/New_York", "Europe/London", "Asia/Tokyo"];

export default function OwnerSettingsView() {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [timezone, setTimezone] = useState(TIMEZONES[0]);
  const [theme, setTheme] = useState("light");

  return (
    <div style={{ width: '100%', padding: '32px 0 0 0' }}>
      <div className="card shadow-sm p-4" style={{ borderRadius: 18, border: `1.5px solid ${COLORS.border}`, background: COLORS.primary, width: '100%' }}>
        <h2 className="fw-bold mb-4" style={{ color: COLORS.tertiary, fontSize: 28 }}>Settings</h2>
        <div className="list-group list-group-flush">
          {/* Notifications */}
          <div className="list-group-item d-flex justify-content-between align-items-center" style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${COLORS.border}` }}>
            <div>
              <div className="fw-semibold" style={{ color: COLORS.tertiary, fontSize: 18 }}>Notifications</div>
              <div style={{ color: '#888', fontSize: 15 }}>Use the toggles to turn notifications on or off as you prefer.</div>
            </div>
            <label className="form-switch" style={{ marginBottom: 0 }}>
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(v => !v)} style={{ width: 0, height: 0, opacity: 0, position: 'absolute' }} />
              <span style={{ display: 'inline-block', width: 44, height: 24, background: notifications ? COLORS.secondary : '#ccc', borderRadius: 16, position: 'relative', transition: 'background 0.2s', cursor: 'pointer' }}>
                <span style={{ position: 'absolute', left: notifications ? 22 : 2, top: 2, width: 20, height: 20, background: COLORS.primary, borderRadius: '50%', boxShadow: '0 1px 4px #0a2c4508', transition: 'left 0.2s' }}></span>
              </span>
            </label>
          </div>
          {/* App Language */}
          <div className="list-group-item d-flex justify-content-between align-items-center" style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${COLORS.border}` }}>
            <div>
              <div className="fw-semibold" style={{ color: COLORS.tertiary, fontSize: 18 }}>App Language</div>
              <div style={{ color: '#888', fontSize: 15 }}>Preferred language settings</div>
            </div>
            <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)} style={{ maxWidth: 140, borderRadius: 8, fontWeight: 500, color: COLORS.tertiary, background: COLORS.primary, border: `1.5px solid ${COLORS.border}` }}>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          {/* Time Zone */}
          <div className="list-group-item d-flex justify-content-between align-items-center" style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${COLORS.border}` }}>
            <div>
              <div className="fw-semibold" style={{ color: COLORS.tertiary, fontSize: 18 }}>Time Zone</div>
              <div style={{ color: '#888', fontSize: 15 }}>Updated automatically based on local timezone</div>
            </div>
            <select className="form-select" value={timezone} onChange={e => setTimezone(e.target.value)} style={{ maxWidth: 180, borderRadius: 8, fontWeight: 500, color: COLORS.tertiary, background: COLORS.primary, border: `1.5px solid ${COLORS.border}` }}>
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>
          {/* Color Theme */}
          <div className="list-group-item d-flex justify-content-between align-items-center" style={{ background: 'transparent', border: 'none' }}>
            <div>
              <div className="fw-semibold" style={{ color: COLORS.tertiary, fontSize: 18 }}>Color Theme</div>
              <div style={{ color: '#888', fontSize: 15 }}>Personalize the visual aesthetics of your interface</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className={`btn ${theme === 'light' ? '' : 'btn-outline-secondary'}`} style={{ background: theme === 'light' ? COLORS.secondary : COLORS.primary, color: theme === 'light' ? COLORS.primary : COLORS.tertiary, fontWeight: 600, borderRadius: 8, fontSize: 15, padding: '4px 18px', border: theme === 'light' ? 'none' : `1.5px solid ${COLORS.border}` }} onClick={() => setTheme('light')}>
                <span role="img" aria-label="light">☀️</span> Light
              </button>
              <button className={`btn ${theme === 'dark' ? '' : 'btn-outline-secondary'}`} style={{ background: theme === 'dark' ? COLORS.secondary : COLORS.primary, color: theme === 'dark' ? COLORS.primary : COLORS.tertiary, fontWeight: 600, borderRadius: 8, fontSize: 15, padding: '4px 18px', border: theme === 'dark' ? 'none' : `1.5px solid ${COLORS.border}` }} onClick={() => setTheme('dark')}>
                <span role="img" aria-label="dark">🌙</span> Dark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 