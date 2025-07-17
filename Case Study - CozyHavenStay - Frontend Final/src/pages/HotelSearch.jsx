import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllHotels, getHotelRooms } from "../api/hotels";
import { createReservation } from "../api/reservations";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#ffffff",
  secondary: "#ff8900",
  tertiary: "#0a2c45",
};

// 20 random Unsplash hotel/room images
const hotelImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=600&q=80"
];

function HotelSearch() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);
      try {
        const data = await getAllHotels();
        setHotels(data);
      } catch (err) {
        toast.error("Failed to fetch hotels. Please login or try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  const openModal = async (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
    setRoomsLoading(true);
    setRooms([]);
    setSelectedRoomId(null);
    setCheckIn("");
    setCheckOut("");
    setGuests(1);
    try {
      const data = await getHotelRooms(hotel.hotelId);
      setRooms(data);
    } catch (err) {
      toast.error("Failed to fetch rooms for this hotel.");
    } finally {
      setRoomsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
    setRooms([]);
    setSelectedRoomId(null);
    setCheckIn("");
    setCheckOut("");
    setGuests(1);
    setBookingLoading(false);
  };

  const handleProceedToPayment = async () => {
    setBookingLoading(true);
    try {
      const reservation = await createReservation({
        roomId: selectedRoomId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      });
      closeModal();
      navigate("/payment", {
        state: {
          reservation,
          hotel: selectedHotel,
          hotelImage: hotelImages[hotels.findIndex(h => h.hotelId === selectedHotel.hotelId) % hotelImages.length],
          guests,
        },
      });
    } catch (err) {
      toast.error("Failed to create reservation. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const q = search.toLowerCase();
    return (
      hotel.hotelName?.toLowerCase().includes(q) ||
      hotel.city?.toLowerCase().includes(q) ||
      hotel.state?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div style={{ background: COLORS.primary, minHeight: "100vh" }}>
        <section className="container py-5" style={{ minHeight: "80vh" }}>
          <div className="mb-5 text-center">
            <h2 className="fw-bold mb-3" style={{ color: COLORS.tertiary, fontSize: 36 }}>Find Your Perfect Stay</h2>
            <p className="mb-4" style={{ color: COLORS.secondary, fontSize: 18 }}>Search and book from our premium hotel listings</p>
            <div className="mx-auto" style={{ maxWidth: 480 }}>
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                style={{ borderRadius: 32, border: `2px solid ${COLORS.tertiary}22`, fontSize: 18, paddingLeft: 24 }}
                placeholder="Search by hotel name, city, or state..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
              <div className="spinner-border" style={{ color: COLORS.secondary, width: 48, height: 48 }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              {filteredHotels.length === 0 ? (
                <div className="text-center text-muted" style={{ fontSize: 20 }}>No hotels found.</div>
              ) : (
                filteredHotels.map((hotel, idx) => (
                  <div className="col-md-6 col-lg-4" key={hotel.hotelId}>
                    <div className="hotel-card card h-100 shadow-sm border-0 position-relative d-flex flex-column align-items-center" style={{ background: COLORS.primary, overflow: 'hidden', padding: 0, minHeight: 420, maxWidth: 370, margin: '0 auto' }}>
                      {/* Card image */}
                      <img
                        src={hotelImages[idx % hotelImages.length]}
                        alt={hotel.hotelName}
                        className="w-100"
                        style={{ height: 180, objectFit: 'cover', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem', marginBottom: 0 }}
                      />
                      <div className="card-body w-100 d-flex flex-column justify-content-between p-4" style={{ background: COLORS.primary }}>
                        <h4 className="fw-bold mb-2" style={{ color: COLORS.tertiary, fontSize: 22, letterSpacing: 0.5 }}>{hotel.hotelName}</h4>
                        <div className="mb-2 d-flex align-items-center" style={{ color: COLORS.secondary, fontWeight: 600, fontSize: 15 }}>
                          <FaMapMarkerAlt className="me-2" />
                          {hotel.city}, {hotel.state}, {hotel.country}
                        </div>
                        <div className="mb-3 text-muted" style={{ fontSize: 15 }}>{hotel.description}</div>
                        <div className="mb-2" style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 15 }}>
                          <span className="me-2">Rooms:</span>
                          {hotel.rooms && hotel.rooms.length > 0 ? (
                            hotel.rooms.map(room => (
                              <span key={room.roomId} className="badge me-2 mb-1" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 500, fontSize: 13, borderRadius: 8 }}>
                                {room.roomType} - ₹{room.pricePerNight}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted">No rooms listed</span>
                          )}
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                          <button className="btn btn-book-now px-3 py-1" style={{ fontSize: '0.95rem', borderRadius: '1rem' }} onClick={() => openModal(hotel)}>Book Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
        {/* Booking Modal */}
        {showModal && selectedHotel && (
          <div className="modal fade show" style={{ display: 'block', background: 'rgba(10,44,69,0.18)' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content" style={{ borderRadius: 24, border: `1.5px solid ${COLORS.tertiary}22` }}>
                <div className="modal-header" style={{ borderBottom: 'none', background: COLORS.primary, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                  <h5 className="modal-title fw-bold" style={{ color: COLORS.tertiary, fontSize: 24 }}>{selectedHotel.hotelName}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body" style={{ maxHeight: 500, overflowY: 'auto', background: COLORS.primary }}>
                  <img
                    src={hotelImages[hotels.findIndex(h => h.hotelId === selectedHotel.hotelId) % hotelImages.length]}
                    alt={selectedHotel.hotelName}
                    className="w-100 mb-3"
                    style={{ height: 180, objectFit: 'cover', borderRadius: 16 }}
                  />
                  <div className="mb-2 d-flex align-items-center" style={{ color: COLORS.secondary, fontWeight: 600, fontSize: 16 }}>
                    <FaMapMarkerAlt className="me-2" />
                    {selectedHotel.city}, {selectedHotel.state}, {selectedHotel.country}
                  </div>
                  <div className="mb-3 text-muted" style={{ fontSize: 15 }}>{selectedHotel.description}</div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Check-in Date</label>
                    <input type="date" className="form-control" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Check-out Date</label>
                    <input type="date" className="form-control" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Number of Guests</label>
                    <input type="number" className="form-control" min={1} value={guests} onChange={e => setGuests(Number(e.target.value))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Choose Room</label>
                    {roomsLoading ? (
                      <div className="d-flex align-items-center gap-2"><div className="spinner-border spinner-border-sm" style={{ color: COLORS.secondary }}></div> Loading rooms...</div>
                    ) : rooms.length === 0 ? (
                      <div className="text-muted">No rooms available for this hotel.</div>
                    ) : (
                      <div className="row g-2">
                        {rooms.map(room => (
                          <div className="col-12 col-md-6" key={room.roomId}>
                            <div className={`card p-3 h-100 ${selectedRoomId === room.roomId ? 'border border-2 border-warning' : 'border-0'}`} style={{ cursor: 'pointer', borderRadius: 16, background: '#f7fafd' }} onClick={() => setSelectedRoomId(room.roomId)}>
                              <div className="fw-bold mb-1" style={{ color: COLORS.tertiary }}>{room.roomType}</div>
                              <div style={{ color: COLORS.secondary, fontWeight: 600 }}>₹{room.pricePerNight} / night</div>
                              <div className="text-muted" style={{ fontSize: 14 }}>{room.description}</div>
                              <div className="mt-2"><span className="badge bg-success">{room.available ? 'Available' : 'Unavailable'}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTop: 'none', background: COLORS.primary, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                  <button className="btn btn-secondary" onClick={closeModal} disabled={bookingLoading}>Cancel</button>
                  <button className="btn btn-book-now px-4 py-2" style={{ fontSize: 16 }} disabled={!selectedRoomId || !checkIn || !checkOut || roomsLoading || bookingLoading} onClick={handleProceedToPayment}>
                    {bookingLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : null} Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default HotelSearch; 