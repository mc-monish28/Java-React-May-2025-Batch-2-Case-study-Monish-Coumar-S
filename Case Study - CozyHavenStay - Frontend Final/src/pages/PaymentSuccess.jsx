import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import paymentSuccessImg from "../assets/Payment success.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state || !state.reservation || !state.hotel) {
    return <div className="container py-5 text-center">Invalid payment session.</div>;
  }
  const { hotelImage } = state;

  return (
    <>
      <Navbar />
      <div style={{ background: COLORS.primary, minHeight: "100vh" }}>
        <section className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
          <div className="row w-100 align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <div className="col-lg-7 col-md-7 col-12 d-flex align-items-center justify-content-center mb-4 mb-lg-0" style={{ height: '100%' }}>
              <img src={paymentSuccessImg} alt="Payment Success" className="img-fluid" style={{ maxWidth: 520, width: '100%', maxHeight: 520, objectFit: 'contain' }} />
            </div>
            <div className="col-lg-5 col-md-5 col-12 d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '100%' }}>
              <h2 className="fw-bold mb-3" style={{ color: COLORS.tertiary, fontSize: 28 }}>
                <span role="img" aria-label="check">✅</span> Booking Confirmed!
              </h2>
              <div className="mb-3" style={{ color: COLORS.secondary, fontWeight: 600, fontSize: 18 }}>
                Thank you for choosing Cozy Haven Stay!
              </div>
              <div className="mb-4" style={{ color: '#444', fontSize: 16, lineHeight: 1.7 }}>
                Your hotel booking has been successfully completed. A confirmation email with your booking details has been sent to your registered emailaddress.<br /><br />
                We look forward to making your stay exceptional.<br /><br />
                Safe travels and see you soon! <span role="img" aria-label="hotel">🏨</span>
              </div>
              <button className="btn btn-book-now px-4 py-2" style={{ fontSize: 16 }} onClick={() => navigate("/")}>Back to Home</button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default PaymentSuccess; 