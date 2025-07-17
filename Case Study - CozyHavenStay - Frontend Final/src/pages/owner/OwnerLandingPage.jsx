import React from "react";
import OwnerNavbar from "../../components/OwnerNavbar";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import hotelOwner1 from "../../assets/Hotelowner1.jpg";
import hotelOwner2 from "../../assets/Hotelowner2.svg";
import hotelOwner3 from "../../assets/Hotelowner3.svg";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  light: "#f8f9fa"
};

function OwnerLandingPage() {
  return (
    <>
      <OwnerNavbar />
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '80vh',
        width: '100%',
        background: COLORS.light,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 0
      }}>
        <div className="container position-relative" style={{ zIndex: 2, maxWidth: 1200 }}>
          <div className="row align-items-center flex-lg-row flex-column-reverse" style={{ minHeight: '70vh' }}>
            <div className="col-lg-7 col-12 text-lg-start text-center" style={{ color: COLORS.tertiary }}>
              <h1 className="fw-bold mb-3" style={{ fontSize: 48, letterSpacing: 1.2, lineHeight: 1.1 }}>
                Empower Your Hospitality Business
              </h1>
              <div className="mb-4" style={{ color: COLORS.secondary, fontSize: 26, fontWeight: 800 }}>
                All-in-One Hotel Owner Platform
              </div>
              <div className="mb-5" style={{ fontSize: 20, opacity: 0.95, maxWidth: 520 }}>
                List, manage, and grow your properties with real-time bookings, analytics, and seamless automation.
              </div>
              <a href="/register" className="btn btn-premium btn-lg px-5 py-3 shadow-sm owner-cta-btn" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 900, borderRadius: 32, fontSize: 22, letterSpacing: 1 }}>Get Started Now</a>
            </div>
            <div className="col-lg-5 col-12 text-center mb-4 mb-lg-0">
              <img src={hotelOwner1} alt="Hotel Owner" className="img-fluid" style={{ maxHeight: 420, width: '100%', objectFit: 'contain', background: 'transparent' }} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container py-5">
        <div className="row justify-content-center align-items-center g-5 flex-lg-row flex-column-reverse">
          <div className="col-lg-6 col-12 text-center text-lg-start">
            <div className="row g-4">
              <div className="col-12 col-md-4 owner-feature-block">
                <div style={{ fontSize: 44, color: COLORS.secondary, marginBottom: 10 }}>🏨</div>
                <div className="fw-bold mb-2" style={{ color: COLORS.tertiary, fontSize: 20 }}>Unified Dashboard</div>
                <div style={{ color: '#444', fontSize: 16 }}>Manage properties, rooms, and rates in one place.</div>
              </div>
              <div className="col-12 col-md-4 owner-feature-block">
                <div style={{ fontSize: 44, color: COLORS.secondary, marginBottom: 10 }}>📈</div>
                <div className="fw-bold mb-2" style={{ color: COLORS.tertiary, fontSize: 20 }}>Live Analytics</div>
                <div style={{ color: '#444', fontSize: 16 }}>Track bookings, revenue, and performance in real time.</div>
              </div>
              <div className="col-12 col-md-4 owner-feature-block">
                <div style={{ fontSize: 44, color: COLORS.secondary, marginBottom: 10 }}>🔒</div>
                <div className="fw-bold mb-2" style={{ color: COLORS.tertiary, fontSize: 20 }}>Secure & Scalable</div>
                <div style={{ color: '#444', fontSize: 16 }}>Enterprise-grade security and cloud reliability.</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 text-center mb-4 mb-lg-0">
            <img src={hotelOwner2} alt="Features Accent" className="img-fluid" style={{ maxHeight: 340, width: '100%', objectFit: 'contain', background: 'transparent' }} />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="container py-5">
        <div className="row justify-content-center g-4">
          {/* Testimonial 1 */}
          <div className="col-md-4">
            <div className="owner-testimonial tweet-card p-4 h-100 d-flex flex-column" style={{ background: COLORS.primary, border: '1.5px solid #e6e6e6', borderRadius: 24, boxShadow: '0 2px 16px #0a2c4510', minHeight: 240 }}>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: COLORS.tertiary, color: COLORS.primary, fontWeight: 800, fontSize: 22 }}>
                  RK
                </div>
                <div>
                  <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 17 }}>Ravi Kumar</div>
                  <div style={{ color: '#888', fontSize: 14 }}>@grandheritageinn</div>
                </div>
              </div>
              <div style={{ color: COLORS.tertiary, fontSize: 17, fontStyle: 'italic', flex: 1 }}>
                “Cozy Haven Stay transformed our operations. The dashboard is sleek, powerful, and support is always on point.”
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="col-md-4">
            <div className="owner-testimonial tweet-card p-4 h-100 d-flex flex-column" style={{ background: COLORS.primary, border: '1.5px solid #e6e6e6', borderRadius: 24, boxShadow: '0 2px 16px #0a2c4510', minHeight: 240 }}>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: COLORS.secondary, color: COLORS.primary, fontWeight: 800, fontSize: 22 }}>
                  MT
                </div>
                <div>
                  <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 17 }}>Meena Thomas</div>
                  <div style={{ color: '#888', fontSize: 14 }}>@bluelagoonhotels</div>
                </div>
              </div>
              <div style={{ color: COLORS.tertiary, fontSize: 17, fontStyle: 'italic', flex: 1 }}>
                “We scaled from one to five properties in under a year. The SaaS backend is a game-changer.”
              </div>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="col-md-4">
            <div className="owner-testimonial tweet-card p-4 h-100 d-flex flex-column" style={{ background: COLORS.primary, border: '1.5px solid #e6e6e6', borderRadius: 24, boxShadow: '0 2px 16px #0a2c4510', minHeight: 240 }}>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, background: COLORS.secondary, color: COLORS.primary, fontWeight: 800, fontSize: 22 }}>
                  AK
                </div>
                <div>
                  <div className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 17 }}>Anil Kapoor</div>
                  <div style={{ color: '#888', fontSize: 14 }}>@cityviewresorts</div>
                </div>
              </div>
              <div style={{ color: COLORS.tertiary, fontSize: 17, fontStyle: 'italic', flex: 1 }}>
                “The onboarding was seamless and the analytics dashboard is a must-have for any hotelier.”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA & FOOTER SECTION */}
      <section className="container-fluid py-5" style={{ background: COLORS.light }}>
        <div className="container">
          <div className="row align-items-center flex-lg-row flex-column-reverse">
            <div className="col-lg-7 col-12 text-lg-start text-center">
              <h2 className="fw-bold mb-3" style={{ color: COLORS.tertiary, fontSize: 32, letterSpacing: 1.1 }}>
                Ready to Elevate Your Hotel Business?
              </h2>
              <a href="/register" className="btn btn-premium btn-lg px-5 py-3 shadow-sm mb-3 owner-cta-btn" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 900, borderRadius: 32, fontSize: 22, letterSpacing: 1 }}>Sign Up as Hotel Owner</a>
              <div className="mt-3" style={{ color: COLORS.tertiary, fontSize: 16, opacity: 0.95 }}>
                <b>Need Help?</b> <a href="mailto:partners@cozyhavenstay.com" style={{ color: COLORS.secondary, fontWeight: 700 }}>partners@cozyhavenstay.com</a>
              </div>
              <div className="mt-4 d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-lg-start" style={{ fontSize: 15, color: COLORS.tertiary, opacity: 0.9 }}>
                <a href="#" style={{ color: COLORS.tertiary, textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</a>
                <span>|</span>
                <a href="#" style={{ color: COLORS.tertiary, textDecoration: 'underline', fontWeight: 600 }}>Terms of Use</a>
                <span>|</span>
                <a href="#" style={{ color: COLORS.tertiary, textDecoration: 'underline', fontWeight: 600 }}>Partner Program</a>
              </div>
              <div className="mt-3" style={{ color: COLORS.tertiary, fontSize: 14, opacity: 0.7 }}>
                © 2025 Cozy Haven Stay. All rights reserved.
              </div>
            </div>
            <div className="col-lg-5 col-12 text-center mb-4 mb-lg-0">
              <img src={hotelOwner3} alt="Footer Accent" className="img-fluid" style={{ maxHeight: 220, width: '100%', objectFit: 'contain', background: 'transparent' }} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default OwnerLandingPage; 