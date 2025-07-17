import React, { useState } from "react";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff",
  border: "#e0e6ed"
};

const TERMS = [
  {
    title: "Account Responsibility",
    icon: "🔑",
    content: (
      <>
        You are responsible for maintaining the confidentiality of your login credentials and any actions performed through your account.<br />
        Unauthorized use must be reported immediately.
      </>
    )
  },
  {
    title: "Property Listings",
    icon: "🏨",
    content: (
      <>
        Only list hotels and rooms that you legally own or are authorized to manage.<br />
        Ensure all property details, room availability, and pricing are accurate and updated in real-time.<br />
        <span style={{ color: COLORS.secondary, fontWeight: 600 }}>Misleading information may lead to suspension of your listing or account.</span>
      </>
    )
  },
  {
    title: "Guest Bookings",
    icon: "📅",
    content: (
      <>
        You must honor all confirmed guest bookings made through the platform.<br />
        Any cancellations or changes initiated by you must comply with your stated policy and communicated promptly to guests.
      </>
    )
  },
  {
    title: "Data Privacy",
    icon: "🔒",
    content: (
      <>
        Guest data provided through bookings must be used only for fulfillment and customer service.<br />
        <span style={{ color: COLORS.secondary, fontWeight: 600 }}>Sharing or using this data for external marketing is strictly prohibited.</span>
      </>
    )
  },
  {
    title: "Commission and Payments",
    icon: "💸",
    content: (
      <>
        Cozy Haven Stay may apply service or commission charges as per your partner agreement.<br />
        Ensure your payout and payment details are up-to-date for timely settlement.
      </>
    )
  },
  {
    title: "Platform Usage",
    icon: "🖥️",
    content: (
      <>
        Do not attempt to manipulate, reverse-engineer, or damage platform operations.<br />
        We reserve the right to audit usage behavior to maintain service integrity.
      </>
    )
  },
  {
    title: "Suspension & Termination",
    icon: "⛔",
    content: (
      <>
        Violation of these terms may result in temporary suspension or permanent termination of your Hotel Owner account.
      </>
    )
  }
];

export default function OwnerTermsView() {
  const [open, setOpen] = useState(Array(TERMS.length).fill(false));

  const toggle = idx => setOpen(o => o.map((v, i) => (i === idx ? !v : v)));

  return (
    <div style={{ width: '100%', padding: '32px 0 0 0' }}>
      <div className="card shadow-sm p-4 mb-4" style={{ borderRadius: 18, border: `1.5px solid ${COLORS.border}`, background: COLORS.primary, width: '100%' }}>
        <div className="d-flex align-items-center mb-3">
          <span style={{ fontSize: 32, marginRight: 12 }}>🛡️</span>
          <h2 className="fw-bold mb-0" style={{ color: COLORS.tertiary, fontSize: 28 }}>Terms and Conditions – Hotel Owner</h2>
        </div>
        <div style={{ color: '#888', fontSize: 16, marginBottom: 18 }}>
          Welcome to Cozy Haven Stay's Hotel Owner Dashboard. By using this platform, you agree to the following terms:
        </div>
        {TERMS.map((term, idx) => (
          <div key={term.title} className="mb-3">
            <div
              className="d-flex align-items-center justify-content-between p-3 rounded-3"
              style={{ background: '#f8f9fa', border: `1.5px solid ${COLORS.border}`, cursor: 'pointer', userSelect: 'none' }}
              onClick={() => toggle(idx)}
            >
              <div className="d-flex align-items-center">
                <span style={{ fontSize: 22, marginRight: 12 }}>{term.icon}</span>
                <span className="fw-semibold" style={{ color: COLORS.tertiary, fontSize: 18 }}>{idx + 1}. {term.title}</span>
              </div>
              <span style={{ fontSize: 22, color: COLORS.secondary }}>{open[idx] ? '−' : '+'}</span>
            </div>
            {open[idx] && (
              <div className="p-3" style={{ background: '#fff', border: `1.5px solid ${COLORS.border}`, borderTop: 'none', borderRadius: '0 0 12px 12px', color: COLORS.tertiary, fontSize: 16 }}>
                {term.content}
              </div>
            )}
          </div>
        ))}
        <div className="mt-4 p-3 rounded-3" style={{ background: '#fff8f0', border: `1.5px solid ${COLORS.secondary}55` }}>
          <div className="fw-bold mb-1" style={{ color: COLORS.tertiary, fontSize: 18 }}>📬 Need Help or Have Questions?</div>
          <div style={{ color: COLORS.secondary, fontWeight: 700, fontSize: 16 }}>Contact our Partner Support Team at <a href="mailto:partnersupport@cozyhavenstay.com" style={{ color: COLORS.secondary, textDecoration: 'underline' }}>partnersupport@cozyhavenstay.com</a></div>
        </div>
      </div>
    </div>
  );
} 