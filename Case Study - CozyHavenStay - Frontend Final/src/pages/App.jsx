import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import heroImg from "../assets/Hero Section.jpg";
import { FaRegCalendarCheck, FaClock, FaLock, FaHeadset } from "react-icons/fa";
import Footer from "../components/Footer";
import { Routes, Route } from 'react-router-dom';
import MyBookings from './MyBookings';
import Terms from './Terms';
import HotelSearch from './HotelSearch';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';
import OwnerLandingPage from './owner/OwnerLandingPage';
import Payment from './Payment';
import PaymentSuccess from './PaymentSuccess';
import OwnerSignIn from './owner/OwnerSignIn';
import HotelOwnerDashboard from './owner/HotelOwnerDashboard';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

const testimonials = [
  {
    name: "Emily R.",
    text: "Cozy Haven Stay made booking my vacation so easy and stress-free! Highly recommended.",
  },
  {
    name: "James T.",
    text: "The best hotel booking experience I've ever had. The interface is beautiful and intuitive.",
  },
  {
    name: "Priya S.",
    text: "As a frequent traveler, I love how simple it is to manage my reservations!",
  },
];

const features = [
  {
    title: "Seamless Booking",
    desc: "Effortlessly search and reserve your perfect stay in just a few clicks.",
    icon: <FaRegCalendarCheck />,
  },
  {
    title: "Real-Time Availability",
    desc: "See up-to-date room availability and instant confirmation.",
    icon: <FaClock />,
  },
  {
    title: "Secure Payments",
    desc: "Your transactions are protected with industry-leading security.",
    icon: <FaLock />,
  },
  {
    title: "24/7 Support",
    desc: "Our team is always here to help, day or night.",
    icon: <FaHeadset />,
  },
];

const pricing = [
  {
    plan: "Starter",
    price: "$29/mo",
    features: ["List up to 5 properties", "Basic analytics", "Email support"],
    highlight: false,
  },
  {
    plan: "Pro",
    price: "$59/mo",
    features: ["Unlimited properties", "Advanced analytics", "Priority support", "Custom branding"],
    highlight: true,
  },
  {
    plan: "Enterprise",
    price: "Contact Us",
    features: ["Custom integrations", "Dedicated manager", "API access"],
    highlight: false,
  },
];

const animatedSubtexts = [
  "Book your dream stay in seconds.",
  "Premium comfort, seamless experience.",
  "For guests and hotel owners alike.",
];

function setFaviconAndTitle(path) {
  let title = 'Cozy Haven Stay';
  let favicon = '/Customer-favicon.png';
  if (path.startsWith('/admin')) {
    title = 'Cozy Haven Stay - Admin Portal';
    favicon = '/Admin-favicon.png';
  } else if (path.startsWith('/owner')) {
    title = 'Cozy Haven Stay - Owner Portal';
    favicon = '/Owner-favicon.png';
  }
  document.title = title;
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = favicon;
}

function App() {
  const [subtextIdx, setSubtextIdx] = useState(0);
  useEffect(() => {
    setFaviconAndTitle(window.location.pathname);
    const handleRouteChange = () => setFaviconAndTitle(window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
    const interval = setInterval(() => {
      setSubtextIdx((idx) => (idx + 1) % animatedSubtexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div style={{ background: COLORS.primary, minHeight: "100vh" }}>
          <Navbar isLoggedIn={false} />
          {/* Hero Section */}
          <section className="container-fluid position-relative overflow-hidden px-0" style={{ minHeight: '95vh', display: 'flex', alignItems: 'center', width: '100vw' }}>
            <div className="hero-bg-burned-orange"></div>
            <div className="hero-bg-burned-blue"></div>
            <div className="container hero-content position-relative" style={{ zIndex: 2, maxWidth: 1440, margin: '0 auto' }}>
              <div className="row align-items-center justify-content-center g-5" style={{ minHeight: '90vh' }}>
                <div className="col-lg-6 order-lg-1 order-2 d-flex flex-column justify-content-center mx-auto" style={{ minHeight: '70vh' }}>
                  <span className="badge rounded-pill px-3 py-2 mb-3" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, fontSize: 16, letterSpacing: 1 }}>
                    #1 Choice for Modern Travelers
                  </span>
                  <h1 className="fw-extrabold mb-3 lh-1" style={{ color: COLORS.tertiary, fontSize: 56, letterSpacing: 1, fontWeight: 900, fontFamily: 'Nunito Sans, Segoe UI, Arial, sans-serif' }}>
                    Online <span style={{ color: COLORS.secondary, fontWeight: 900 }}>Hotel</span><br />
                    <span style={{ color: COLORS.tertiary, fontWeight: 900 }}>Booking</span>
                  </h1>
                  <h4 className="fw-semibold mb-3" style={{ color: COLORS.secondary, fontSize: 26 }}>
                    Premium Stays. Effortless Management.
                  </h4>
                  <div className="mb-4" style={{ minHeight: 28 }}>
                    <span className="d-inline-block animated-subtext" style={{ color: COLORS.tertiary, fontSize: 20, transition: 'opacity 0.5s' }}>
                      {animatedSubtexts[subtextIdx]}
                    </span>
                  </div>
                  <a href="#" className="btn btn-lg px-5 py-3 btn-premium shadow-lg" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 32, fontSize: 24, boxShadow: '0 8px 32px #ff890025', width: 'fit-content' }}>
                    <span style={{ verticalAlign: 'middle', fontWeight: 800, letterSpacing: 1 }}>Get started</span>
                    <svg width="22" height="22" fill="none" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ms-2" style={{ verticalAlign: 'middle' }}><path d="M5 12h12M13 6l6 6-6 6"/></svg>
                  </a>
                </div>
                <div className="col-lg-6 order-lg-2 order-1 text-center position-relative d-flex align-items-center justify-content-center mx-auto" style={{ minHeight: '70vh' }}>
                  <div className="hero-img-shadow position-absolute top-50 start-50 translate-middle" style={{ width: 520, height: 520, background: '#0a2c4510', borderRadius: '50%', zIndex: 0 }}></div>
                  <img src={heroImg} alt="Hotel Booking" className="img-fluid position-relative" style={{ maxHeight: 440, width: 'auto', zIndex: 1, borderRadius: '2rem', boxShadow: '0 8px 32px #0a2c4520', border: 'none', background: 'transparent' }} />
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="container-fluid py-5" style={{ width: '100vw', background: '#fff' }}>
            <div className="container" style={{ maxWidth: 1440, margin: '0 auto' }}>
              <h2 className="text-center fw-bold mb-4" style={{ color: COLORS.tertiary, fontSize: 32 }}>What Our Guests Say</h2>
              <div className="row justify-content-center g-4">
                {testimonials.map((t, idx) => (
                  <div className="col-md-4" key={idx}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 p-3" style={{ background: COLORS.primary, border: `2px solid ${COLORS.tertiary}20` }}>
                      <div className="d-flex flex-column align-items-center">
                        <div className="testimonial-avatar">
                          {t.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div className="testimonial-quote mb-3" style={{ color: COLORS.tertiary, fontSize: 18 }}>
                          {t.text}
                        </div>
                        <div className="fw-bold" style={{ color: COLORS.secondary }}>{t.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="container-fluid py-5" style={{ width: '100vw', background: '#f8f9fa' }}>
            <div className="container" style={{ maxWidth: 1440, margin: '0 auto' }}>
              <h2 className="text-center fw-bold mb-4" style={{ color: COLORS.tertiary, fontSize: 32 }}>Why Choose Cozy Haven Stay?</h2>
              <div className="row justify-content-center g-4">
                {features.map((f, idx) => (
                  <div className="col-md-3" key={idx}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-3" style={{ background: COLORS.primary, border: `2px solid ${COLORS.tertiary}20` }}>
                      <div className="feature-icon mb-2">{f.icon}</div>
                      <h5 className="fw-bold mb-2" style={{ color: COLORS.tertiary }}>{f.title}</h5>
                      <p style={{ color: "#444" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section for Hotel Owners */}
          <section className="container-fluid py-5" style={{ width: '100vw', background: '#fff' }}>
            <div className="container" style={{ maxWidth: 1440, margin: '0 auto' }}>
              <h2 className="text-center fw-bold mb-4" style={{ color: COLORS.tertiary, fontSize: 32 }}>For Hotel Owners: Simple Pricing</h2>
              <div className="row justify-content-center g-4">
                {pricing.map((p, idx) => (
                  <div className="col-md-4" key={idx}>
                    <div className={`card h-100 shadow-sm rounded-4 text-center border-3 pricing-card ${p.highlight ? "pricing-highlight" : "border-0"}`} style={{ background: COLORS.primary, borderColor: p.highlight ? COLORS.secondary : `${COLORS.tertiary}20` }}>
                      <div className="card-body">
                        {p.highlight && <div className="pricing-badge">Most Popular</div>}
                        <h5 className="fw-bold mb-2" style={{ color: p.highlight ? COLORS.secondary : COLORS.tertiary }}>{p.plan}</h5>
                        <div className="mb-3" style={{ fontSize: 32, color: COLORS.tertiary, fontWeight: 700 }}>{p.price}</div>
                        <ul className="list-unstyled mb-4">
                          {p.features.map((feat, i) => (
                            <li key={i} className="mb-2" style={{ color: COLORS.tertiary }}>
                              {feat}
                            </li>
                          ))}
                        </ul>
                        <a href="/owner" className="btn btn-lg px-4 py-2 btn-premium" style={{ background: p.highlight ? COLORS.secondary : COLORS.tertiary, color: COLORS.primary, fontWeight: 600, borderRadius: 32 }}>
                          {p.plan === "Enterprise" ? "Contact Sales" : "Get Started"}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      } />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/hotels" element={<HotelSearch />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/owner" element={<OwnerLandingPage />} />
      <Route path="/owner/signin" element={<OwnerSignIn />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/hotel-owner-dashboard" element={<HotelOwnerDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
