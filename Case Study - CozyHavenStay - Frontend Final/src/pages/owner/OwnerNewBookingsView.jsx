import React, { useState, useEffect } from "react";
import { getAllOwnerHotels, getHotelBookings } from "../../api/hotels";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff"
};

export default function OwnerNewBookingsView() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllOwnerHotels().then(data => {
      setHotels(data);
      if (data.length > 0) setSelectedHotel(data[0].hotelId);
    });
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      setLoading(true);
      getHotelBookings(selectedHotel)
        .then(setBookings)
        .catch(() => setBookings([]))
        .finally(() => setLoading(false));
    }
  }, [selectedHotel]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4 gap-3 flex-wrap" style={{ minHeight: 56 }}>
        <h1 style={{ fontSize: 32, color: COLORS.tertiary, margin: 0, fontWeight: 800, flex: '0 0 auto' }}>View Bookings</h1>
        <div className="d-flex align-items-center gap-2" style={{ flex: 1, minWidth: 220, maxWidth: 340 }}>
          <label className="form-label mb-0" style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 16 }}>Select Hotel</label>
          <select
            className="form-select"
            style={{ borderRadius: 10, border: '1.5px solid #e0e6ed', fontSize: 17, fontWeight: 500, color: COLORS.tertiary, background: COLORS.primary, minWidth: 160 }}
            value={selectedHotel || ''}
            onChange={e => setSelectedHotel(Number(e.target.value))}
          >
            {hotels.map(hotel => (
              <option key={hotel.hotelId} value={hotel.hotelId}>{hotel.hotelName}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row g-4">
        {loading ? (
          <div className="text-center w-100 py-5">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center w-100 py-5 text-muted">No bookings found for this hotel.</div>
        ) : bookings.map(booking => (
          <div className="col-md-6 col-lg-4 d-flex" key={booking.bookingId}>
            <div className="card shadow-sm rounded-4 mb-4 d-flex flex-column justify-content-between h-100 w-100" style={{ background: COLORS.primary, border: 'none', minHeight: 260, maxWidth: 370, width: '100%', boxShadow: '0 4px 18px #0a2c4512', position: 'relative', overflow: 'hidden' }}>
              {/* Colored left border */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: booking.status === 'CONFIRMED' ? COLORS.secondary : '#bfc9d9', borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }} />
              <div className="p-4 d-flex flex-column h-100 justify-content-between">
                <div>
                  <div className="d-flex align-items-center mb-2 gap-2">
                    <div className="fw-bold" style={{ fontSize: 22, color: COLORS.tertiary, flex: 1, letterSpacing: 0.5 }}>
                      {booking.user?.username || 'Guest'}
                    </div>
                    <span className="badge rounded-pill px-3 py-2" style={{ background: booking.status === 'CONFIRMED' ? '#e6f7e6' : '#ffe6e6', color: booking.status === 'CONFIRMED' ? '#1a7f37' : '#c00', fontWeight: 700, fontSize: 14, letterSpacing: 1 }}>
                      {booking.status || 'PENDING'}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-2 gap-2">
                    <span style={{ color: COLORS.secondary, fontWeight: 700, fontSize: 16 }}>
                      {booking.room?.roomType || '-'} #{booking.room?.roomNumber || '-'}
                    </span>
                    <span className="badge bg-light text-dark ms-2" style={{ fontWeight: 600, fontSize: 13, border: `1px solid ${COLORS.tertiary}22`, color: COLORS.tertiary }}>
                      Guests: {booking.numberOfGuests || 1}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-light text-dark" style={{ fontWeight: 600, fontSize: 13, border: `1px solid ${COLORS.secondary}22`, color: COLORS.secondary }}>
                      Check-in: {booking.checkIn || booking.checkInDate}
                    </span>
                    <span className="badge bg-light text-dark" style={{ fontWeight: 600, fontSize: 13, border: `1px solid ${COLORS.tertiary}22`, color: COLORS.tertiary }}>
                      Check-out: {booking.checkOut || booking.checkOutDate}
                    </span>
                  </div>
                  <div className="mb-2 text-muted" style={{ fontSize: 15, minHeight: 24 }}>
                    {booking.room?.description}
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-between mt-3">
                  <div style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 15 }}>
                    Booking ID: <span style={{ fontWeight: 700 }}>{booking.bookingId}</span>
                  </div>
                  <div className="badge rounded-pill px-3 py-2" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, fontSize: 16, letterSpacing: 1, boxShadow: '0 2px 8px #ff890025' }}>
                    ₹{booking.totalPrice || booking.price || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 