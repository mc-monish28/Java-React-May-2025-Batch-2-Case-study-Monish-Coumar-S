import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  light: "#f8f9fa"
};

function Terms() {
  return (
    <>
      <Navbar />
      <div style={{ background: COLORS.light, minHeight: "100vh" }}>
        <section className="container py-5 d-flex justify-content-center align-items-start" style={{ minHeight: '90vh' }}>
          <div className="w-100 px-2" style={{ maxWidth: 900 }}>
            <h2 className="fw-bold mb-2 text-center" style={{ color: COLORS.tertiary, fontSize: 36, letterSpacing: 1 }}>
              🛡️ Terms & Conditions | Cozy Haven Stay
            </h2>
            <div style={{ width: 90, height: 4, background: `linear-gradient(90deg, ${COLORS.secondary} 0%, ${COLORS.tertiary} 100%)`, borderRadius: 4, margin: '0.5rem auto 2.5rem' }} />
            <blockquote className="blockquote text-center mb-5" style={{ fontSize: 22, color: COLORS.tertiary, fontWeight: 600, background: 'rgba(255,137,0,0.07)', borderRadius: 16, padding: '2rem 1.5rem' }}>
              <p className="mb-2">Your Stay, Our Responsibility.</p>
              <footer className="blockquote-footer" style={{ color: COLORS.secondary, fontWeight: 700, fontSize: 17 }}>
                By accessing and using the Cozy Haven Stay platform, you agree to the following terms that govern your hotel bookings, property listings, and overall experience on our SaaS-based ecosystem.<br />
                Whether you're here to relax or host, we’re committed to delivering a safe, seamless, and transparent hospitality journey.
              </footer>
            </blockquote>
            <hr className="mb-5" />
            <h4 className="fw-bold mb-4" style={{ color: COLORS.tertiary, fontSize: 28, letterSpacing: 0.5 }}>📄 Terms & Conditions</h4>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>1. Definitions</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li><b>Platform</b> refers to Cozy Haven Stay, our SaaS-based hotel booking and property management system.</li>
                <li><b>User</b> refers to any individual who uses the platform to search, book, or review hotels.</li>
                <li><b>Hotel Owner</b> refers to authorized individuals or entities with access to a Hotel Owner Account to manage hotel listings, rooms, and bookings.</li>
                <li><b>Booking</b> refers to a reservation made through the platform for a stay at a listed hotel.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>2. Eligibility & Account Creation</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>All users must be at least 18 years of age to create an account and/or make a booking.</li>
                <li>Hotel owners must undergo a verification process before being granted an Owner ID and access credentials.</li>
                <li>The platform reserves the right to approve or deny owner access at its sole discretion.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>3. User Responsibilities</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>Provide accurate personal and payment details while booking.</li>
                <li>Comply with check-in/check-out policies and hotel-specific rules.</li>
                <li>Refrain from unlawful activities or abuse of the platform.</li>
                <li>Users are solely responsible for reviewing cancellation and refund policies before making a booking.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>4. Hotel Owner Responsibilities</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>Hotel owners must maintain accurate property, room, and pricing information.</li>
                <li>Owners are responsible for managing availability, updating bookings, and honoring reservations made via the platform.</li>
                <li>Owners are strictly prohibited from listing properties they do not legally own or operate.</li>
                <li>Bookings made through Cozy Haven Stay must be honored in accordance with the agreed-upon terms.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>5. Booking, Payment & Refunds</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>All bookings are subject to real-time availability and confirmation.</li>
                <li>Payments are processed through secure gateways; transaction details are not stored beyond operational requirements.</li>
                <li>Refunds, if applicable, are subject to each hotel’s cancellation policy and timeline.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>6. Data Privacy & Security</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>We are committed to safeguarding user data under applicable data protection laws.</li>
                <li>Data collected is used only for booking, communication, service improvement, and legal compliance.</li>
                <li>Hotel owners must not misuse customer information for unsolicited promotions or personal gains.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>7. Platform Rights & Limitations</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>Cozy Haven Stay acts as an intermediary and is not liable for disputes between users and hotel owners.</li>
                <li>We reserve the right to suspend or terminate accounts for violations, misuse, or fraudulent activity.</li>
                <li>We may update these terms periodically. Continued usage signifies acceptance of the revised terms.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>8. Intellectual Property</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>All content, branding, and technology associated with Cozy Haven Stay is owned or licensed by us.</li>
                <li>Unauthorized reproduction or distribution is strictly prohibited.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>9. Termination & Suspension</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>Users or owners may deactivate their account upon written request.</li>
                <li>The platform may suspend or terminate any account in the event of policy breach, fraud, or misuse without prior notice.</li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="fw-bold mb-3" style={{ color: COLORS.secondary, fontSize: 22 }}>10. Governing Law</h5>
              <ul className="mb-0 ps-4" style={{ fontSize: 17, lineHeight: 1.8 }}>
                <li>These terms are governed by the laws of the jurisdiction in which Cozy Haven Stay operates.</li>
                <li>Any disputes arising shall be subject to the exclusive jurisdiction of the courts in said jurisdiction.</li>
              </ul>
            </div>
            <hr className="my-5" />
            <div className="mb-2 text-center">
              <h5 className="fw-bold mb-2" style={{ color: COLORS.tertiary, fontSize: 20 }}>📬 Need Help?</h5>
              <div style={{ fontSize: 18 }}>
                For questions or support, reach out to us at <a href="mailto:support@cozyhavenstay.com" style={{ color: COLORS.secondary, fontWeight: 700 }}>support@cozyhavenstay.com</a> or visit our <a href="#" style={{ color: COLORS.secondary, fontWeight: 700 }}>Help Center</a>.
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Terms; 