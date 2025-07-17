import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import upiQr from "../assets/UPI.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import toast from 'react-hot-toast';

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

const paymentMethods = [
  { label: "Credit/Debit Card", value: "card" },
  { label: "UPI", value: "upi" },
  { label: "Netbanking", value: "netbanking" },
];

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ card: "", holder: "", expiry: "", cvv: "", upi: "", bank: "" });
  const [showUpiQr, setShowUpiQr] = useState(false);
  const [upiQrLoading, setUpiQrLoading] = useState(false);

  if (!state || !state.reservation || !state.hotel) {
    return <div className="container py-5 text-center">Invalid payment session.</div>;
  }

  const { reservation, hotel, hotelImage, guests } = state;
  const room = reservation.room;

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:8080/api/users/reservations/${reservation.reservationId}/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Payment failed');
      // Optionally, you can use the response data if needed
      // const data = await res.json();
      setTimeout(() => {
        navigate("/payment-success", {
          state: {
            reservation,
            hotel,
            hotelImage,
            guests,
          },
        });
      }, 800);
    } catch (err) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMethodChange = (val) => {
    setMethod(val);
    if (val === "upi") {
      setShowUpiQr(false);
      setUpiQrLoading(true);
      setTimeout(() => {
        setShowUpiQr(true);
        setUpiQrLoading(false);
      }, 1500);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ background: COLORS.primary, minHeight: "100vh" }}>
        <section className="container py-5">
          <div className="row justify-content-center align-items-start g-5">
            {/* Booking Details Card */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card shadow hotel-card p-0" style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${COLORS.tertiary}` }}>
                <img src={hotelImage} alt={hotel.hotelName} className="w-100" style={{ height: 180, objectFit: 'cover' }} />
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-2" style={{ color: COLORS.tertiary }}>{hotel.hotelName}</h4>
                  <div className="mb-2" style={{ color: COLORS.secondary, fontWeight: 600 }}>
                    {hotel.city}, {hotel.state}, {hotel.country}
                  </div>
                  <div className="mb-3 text-muted" style={{ fontSize: 15 }}>{hotel.description}</div>
                  <hr />
                  <div className="mb-2"><b>Room:</b> {room.roomType} ({room.roomNumber})</div>
                  <div className="mb-2"><b>Check-in:</b> {reservation.checkInDate}</div>
                  <div className="mb-2"><b>Check-out:</b> {reservation.checkOutDate}</div>
                  <div className="mb-2"><b>Guests:</b> {guests}</div>
                  <div className="mb-2"><b>Reservation ID:</b> {reservation.reservationId}</div>
                  <div className="mb-2"><b>Total Price:</b> <span style={{ color: COLORS.secondary, fontWeight: 700 }}>₹{reservation.totalPrice}</span></div>
                </div>
              </div>
            </div>
            {/* Payment Options */}
            <div className="col-lg-6">
              <div className="card shadow p-4" style={{ borderRadius: 14, border: `1px solid ${COLORS.tertiary}` }}>
                <h4 className="fw-bold mb-4" style={{ color: COLORS.tertiary }}>Payment</h4>
                <form onSubmit={handlePay}>
                  <div className="mb-4">
                    {paymentMethods.map(opt => (
                      <div className="form-check form-check-inline me-4" key={opt.value}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="method"
                          id={opt.value}
                          value={opt.value}
                          checked={method === opt.value}
                          onChange={() => handleMethodChange(opt.value)}
                        />
                        <label className="form-check-label" htmlFor={opt.value} style={{ color: COLORS.tertiary, fontWeight: 600 }}>{opt.label}</label>
                      </div>
                    ))}
                  </div>
                  {method === "card" && (
                    <div className="mb-3">
                      <div className="p-3" style={{ background: '#f7fafd', borderRadius: 10, border: `1px solid ${COLORS.tertiary}22`, boxShadow: '0 2px 8px #0a2c4520', maxWidth: 370, margin: '0 auto' }}>
                        <div className="mb-3">
                          <input type="text" className="form-control form-control-lg mb-2" name="card" value={form.card} onChange={handleInput} placeholder="Card Number" maxLength={19} style={{ borderRadius: 8, fontWeight: 600, fontSize: 18, letterSpacing: 2 }} required />
                          <input type="text" className="form-control form-control-lg mb-2" name="holder" value={form.holder} onChange={handleInput} placeholder="Card Holder Name" style={{ borderRadius: 8, fontWeight: 500, fontSize: 16 }} required />
                          <div className="d-flex gap-2">
                            <input type="text" className="form-control" name="expiry" value={form.expiry} onChange={handleInput} placeholder="MM/YY" maxLength={5} style={{ borderRadius: 8, fontWeight: 500, width: '50%' }} required />
                            <input type="password" className="form-control" name="cvv" value={form.cvv} onChange={handleInput} placeholder="CVV" maxLength={4} style={{ borderRadius: 8, fontWeight: 500, width: '50%' }} required />
                          </div>
                        </div>
                        <div className="text-end text-muted" style={{ fontSize: 13 }}>Your card details are securely processed.</div>
                      </div>
                    </div>
                  )}
                  {method === "upi" && (
                    <>
                      {upiQrLoading ? (
                        <div className="d-flex flex-column align-items-center justify-content-center py-4">
                          <div className="spinner-border" style={{ color: COLORS.secondary, width: 48, height: 48 }} role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <div className="mt-3" style={{ color: COLORS.secondary, fontWeight: 600 }}>Fetching UPI QR...</div>
                        </div>
                      ) : showUpiQr ? (
                        <>
                          <div className="d-flex flex-column align-items-center justify-content-center py-3">
                            <img src={upiQr} alt="UPI QR" style={{ maxWidth: 180, borderRadius: 10, border: `1.5px solid ${COLORS.tertiary}22` }} />
                            <div className="mt-2 mb-2 text-muted" style={{ fontSize: 14 }}>Scan this QR with your UPI app</div>
                          </div>
                          <hr className="my-4" />
                          <div className="mb-3">
                            <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>UPI ID</label>
                            <input type="text" className="form-control" name="upi" value={form.upi} onChange={handleInput} placeholder="yourname@upi" required />
                          </div>
                        </>
                      ) : null}
                    </>
                  )}
                  {method === "netbanking" && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Bank Name</label>
                      <input type="text" className="form-control" name="bank" value={form.bank} onChange={handleInput} placeholder="Bank Name" required />
                    </div>
                  )}
                  <button type="submit" className="btn btn-book-now w-100 py-2 mt-3" style={{ fontSize: 18 }} disabled={loading || (method === 'upi' && (!showUpiQr || upiQrLoading))}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null} Pay ₹{reservation.totalPrice}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Payment; 