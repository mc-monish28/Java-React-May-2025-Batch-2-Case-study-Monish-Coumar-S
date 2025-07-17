import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import toast from 'react-hot-toast';

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

const API_URL = "http://localhost:8080/api/users/reservations/history";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCancel = async (reservationId) => {
    setCancelling((prev) => ({ ...prev, [reservationId]: true }));
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:8080/api/users/reservations/${reservationId}/cancel`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to cancel booking');
      setBookings((prev) => prev.map(b => b.reservationId === reservationId ? { ...b, status: 'CANCELLED', paymentStatus: 'REFUNDED' } : b));
      toast.success('Booking cancelled successfully!');
    } catch (err) {
      toast.error('Failed to cancel booking.');
    } finally {
      setCancelling((prev) => ({ ...prev, [reservationId]: false }));
    }
  };

  // Split bookings into confirmed/paid and cancelled
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.paymentStatus === 'PAID');
  const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED');

  return (
    <>
      <Navbar />
      <div style={{ background: COLORS.primary, minHeight: "100vh" }}>
        <section className="container py-5" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2" style={{ color: COLORS.tertiary, fontSize: 32, display: 'inline-block' }}>
              My Bookings
            </h2>
            <div style={{
              width: 80,
              height: 4,
              background: `linear-gradient(90deg, ${COLORS.secondary} 0%, ${COLORS.tertiary} 100%)`,
              borderRadius: 4,
              margin: '0.5rem auto 0',
            }} />
          </div>
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status" />
            </div>
          )}
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          {!loading && !error && bookings.length === 0 && (
            <div className="text-center text-muted py-5" style={{ fontSize: 20 }}>
              You have no bookings yet.
            </div>
          )}

          {/* Confirmed/Paid Bookings Section */}
          {confirmedBookings.length > 0 && (
            <div className="mb-5">
              <div className="text-center mb-3">
                <h4 style={{ color: COLORS.secondary, fontWeight: 800, fontSize: 26, letterSpacing: 1, marginBottom: 0 }}>Confirmed & Paid Bookings</h4>
                <div style={{ width: 60, height: 3, background: COLORS.secondary, borderRadius: 3, margin: '0.5rem auto 0' }} />
              </div>
              <div className="row g-4 justify-content-center">
                {confirmedBookings.map((b) => (
                  <div className="col-md-6 col-lg-5 d-flex" key={b.reservationId}>
                    <div className="card shadow-sm mb-3 booking-card h-100 w-100" style={{ border: '1px solid rgba(0,0,0,0.18)', borderRadius: 24, background: COLORS.primary, boxShadow: '0 4px 24px #0a2c4510', transition: 'box-shadow 0.2s, transform 0.2s', minHeight: 340 }}>
                      <div className="card-body p-4 h-100 d-flex flex-column justify-content-between" style={{ minHeight: 260 }}>
                        <div className="d-flex align-items-center mb-3 gap-3">
                          <span className="badge rounded-pill px-3 py-2" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>
                            {b.room.roomType}
                          </span>
                          <span className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 20 }}>
                            Room {b.room.roomNumber}
                          </span>
                          <span className="badge rounded-pill px-3 py-2 ms-auto" style={{ background: b.status === 'CONFIRMED' ? '#e6f7e6' : '#ffe6e6', color: b.status === 'CONFIRMED' ? '#1a7f37' : '#c00', fontWeight: 700, fontSize: 14 }}>
                            {b.status}
                          </span>
                        </div>
                        <div className="mb-2 text-muted" style={{ fontSize: 15, minHeight: 24 }}>
                          {b.room.description}
                        </div>
                        <hr style={{ borderTop: '1.5px solid #f0f0f0', margin: '18px 0' }} />
                        <div className="d-flex flex-wrap align-items-center mb-2 gap-3">
                          <div style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 15 }}>
                            <span style={{ opacity: 0.7 }}>Check-in:</span> {b.checkInDate}
                          </div>
                          <div style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 15 }}>
                            <span style={{ opacity: 0.7 }}>Check-out:</span> {b.checkOutDate}
                          </div>
                          <div className="ms-auto" style={{ color: COLORS.secondary, fontWeight: 800, fontSize: 18 }}>
                            ₹{b.totalPrice}
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <span className="badge rounded-pill px-3 py-2" style={{ background: b.paymentStatus === 'PAID' ? '#e6f7e6' : b.paymentStatus === 'REFUNDED' ? '#e6f0ff' : '#fffbe6', color: b.paymentStatus === 'PAID' ? '#1a7f37' : b.paymentStatus === 'REFUNDED' ? '#0a2c45' : '#b8860b', fontWeight: 700, fontSize: 14 }}>
                            {b.paymentStatus}
                          </span>
                          <span className="text-muted ms-auto" style={{ fontSize: 13 }}>
                            Reservation ID: {b.reservationId}
                          </span>
                        </div>
                        {b.status === 'CONFIRMED' ? (
                          <button className="btn btn-premium mt-3 w-100" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 16, fontSize: 16, boxShadow: '0 2px 8px #ff890025' }}
                            disabled={cancelling[b.reservationId]}
                            onClick={() => handleCancel(b.reservationId)}>
                            {cancelling[b.reservationId] ? 'Cancelling...' : 'Cancel Booking'}
                          </button>
                        ) : b.status === 'CANCELLED' ? (
                          <div className="alert alert-warning mt-3 mb-0 py-2 text-center" style={{ borderRadius: 12, fontWeight: 600, fontSize: 15 }}>
                            Cancelled
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cancelled Bookings Section */}
          {cancelledBookings.length > 0 && (
            <div className="mb-5">
              <div className="text-center mb-3">
                <h4 style={{ color: '#c00', fontWeight: 800, fontSize: 26, letterSpacing: 1, marginBottom: 0 }}>Cancelled Bookings</h4>
                <div style={{ width: 60, height: 3, background: '#c00', borderRadius: 3, margin: '0.5rem auto 0' }} />
              </div>
              <div className="row g-4 justify-content-center">
                {cancelledBookings.map((b) => (
                  <div className="col-md-6 col-lg-5 d-flex" key={b.reservationId}>
                    <div className="card shadow-sm mb-3 booking-card h-100 w-100" style={{ border: '1px solid rgba(0,0,0,0.18)', borderRadius: 24, background: COLORS.primary, boxShadow: '0 4px 24px #0a2c4510', transition: 'box-shadow 0.2s, transform 0.2s', minHeight: 340 }}>
                      <div className="card-body p-4 h-100 d-flex flex-column justify-content-between" style={{ minHeight: 260 }}>
                        <div className="d-flex align-items-center mb-3 gap-3">
                          <span className="badge rounded-pill px-3 py-2" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>
                            {b.room.roomType}
                          </span>
                          <span className="fw-bold" style={{ color: COLORS.tertiary, fontSize: 20 }}>
                            Room {b.room.roomNumber}
                          </span>
                          <span className="badge rounded-pill px-3 py-2 ms-auto" style={{ background: b.status === 'CONFIRMED' ? '#e6f7e6' : '#ffe6e6', color: b.status === 'CONFIRMED' ? '#1a7f37' : '#c00', fontWeight: 700, fontSize: 14 }}>
                            {b.status}
                          </span>
                        </div>
                        <div className="mb-2 text-muted" style={{ fontSize: 15, minHeight: 24 }}>
                          {b.room.description}
                        </div>
                        <hr style={{ borderTop: '1.5px solid #f0f0f0', margin: '18px 0' }} />
                        <div className="d-flex flex-wrap align-items-center mb-2 gap-3">
                          <div style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 15 }}>
                            <span style={{ opacity: 0.7 }}>Check-in:</span> {b.checkInDate}
                          </div>
                          <div style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 15 }}>
                            <span style={{ opacity: 0.7 }}>Check-out:</span> {b.checkOutDate}
                          </div>
                          <div className="ms-auto" style={{ color: COLORS.secondary, fontWeight: 800, fontSize: 18 }}>
                            ₹{b.totalPrice}
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <span className="badge rounded-pill px-3 py-2" style={{ background: b.paymentStatus === 'PAID' ? '#e6f7e6' : b.paymentStatus === 'REFUNDED' ? '#e6f0ff' : '#fffbe6', color: b.paymentStatus === 'PAID' ? '#1a7f37' : b.paymentStatus === 'REFUNDED' ? '#0a2c45' : '#b8860b', fontWeight: 700, fontSize: 14 }}>
                            {b.paymentStatus}
                          </span>
                          <span className="text-muted ms-auto" style={{ fontSize: 13 }}>
                            Reservation ID: {b.reservationId}
                          </span>
                        </div>
                        {b.status === 'CONFIRMED' ? (
                          <button className="btn btn-premium mt-3 w-100" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 16, fontSize: 16, boxShadow: '0 2px 8px #ff890025' }}
                            disabled={cancelling[b.reservationId]}
                            onClick={() => handleCancel(b.reservationId)}>
                            {cancelling[b.reservationId] ? 'Cancelling...' : 'Cancel Booking'}
                          </button>
                        ) : b.status === 'CANCELLED' ? (
                          <div className="alert alert-warning mt-3 mb-0 py-2 text-center" style={{ borderRadius: 12, fontWeight: 600, fontSize: 15 }}>
                            Cancelled
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MyBookings; 