import React, { useEffect, useState } from "react";
import { getAllHotels, getAllHotelOwners, getHotelsByOwner, deleteHotel } from "../../api/admin";
import toast, { Toaster } from "react-hot-toast";
import { FaHotel, FaTrash, FaChevronDown, FaChevronUp, FaUserTie } from "react-icons/fa";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff",
  danger: "#dc3545"
};

export default function ManageHotelsView() {
  const [hotels, setHotels] = useState([]);
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedHotel, setExpandedHotel] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchOwners();
    fetchHotels();
  }, []);

  const fetchOwners = () => {
    getAllHotelOwners()
      .then(setOwners)
      .catch(() => {});
  };

  const fetchHotels = (ownerId) => {
    setLoading(true);
    setError(null);
    const fetchFn = ownerId ? getHotelsByOwner : getAllHotels;
    (ownerId ? fetchFn(ownerId) : fetchFn())
      .then(setHotels)
      .catch((err) => setError(err.message || "Failed to load hotels"))
      .finally(() => setLoading(false));
  };

  const handleOwnerChange = (e) => {
    const ownerId = e.target.value;
    setSelectedOwner(ownerId);
    if (ownerId) {
      fetchHotels(ownerId);
    } else {
      fetchHotels();
    }
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    setActionLoading(true);
    try {
      await deleteHotel(hotelId);
      setHotels(hotels.filter(h => h.hotelId !== hotelId));
      toast.success("Hotel deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete hotel: " + (err.message || "Unknown error"));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="d-flex align-items-center justify-content-between mb-4 gap-3 flex-wrap" style={{ minHeight: 56 }}>
        <h1 style={{ fontSize: 32, color: COLORS.tertiary, margin: 0, fontWeight: 800, flex: '0 0 auto' }}>Manage Hotels</h1>
        <div className="d-flex align-items-center gap-2" style={{ flex: 1, minWidth: 220, maxWidth: 340 }}>
          <label className="form-label mb-0" style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 16 }}>Filter by Owner</label>
          <select
            className="form-select"
            style={{ borderRadius: 10, border: '1.5px solid #e0e6ed', fontSize: 17, fontWeight: 500, color: COLORS.tertiary, background: COLORS.primary, minWidth: 160 }}
            value={selectedOwner}
            onChange={handleOwnerChange}
          >
            <option value="">All Owners</option>
            {owners.map(owner => (
              <option key={owner.userId} value={owner.userId}>{owner.username}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row g-4">
        {loading ? (
          <div className="text-center w-100 py-5">Loading hotels...</div>
        ) : error ? (
          <div className="alert alert-danger w-100 text-center">{error}</div>
        ) : hotels.length === 0 ? (
          <div className="text-center w-100 py-5 text-muted">No hotels found.</div>
        ) : hotels.map(hotel => (
          <div className="col-md-6 col-lg-4 d-flex" key={hotel.hotelId} style={{ display: 'flex' }}>
            <div className="card shadow-sm rounded-4 p-4 mb-4 d-flex flex-column justify-content-between flex-grow-1" style={{
              background: COLORS.primary,
              border: '2px solid #e0e6ed',
              minHeight: 320,
              maxWidth: 390,
              width: '100%',
              boxShadow: '0 4px 18px #0a2c4512',
              borderRadius: 18,
              transition: 'box-shadow 0.2s, border 0.2s',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div className="d-flex align-items-center mb-2">
                <FaHotel style={{ fontSize: 36, color: COLORS.secondary, marginRight: 16 }} />
                <div>
                  <div className="fw-bold" style={{ fontSize: 22, color: COLORS.tertiary }}>{hotel.hotelName}</div>
                  <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>{hotel.city}, {hotel.state}</div>
                  <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>Contact: {hotel.contactNumber}</div>
                  <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>Owner: <FaUserTie style={{ color: COLORS.secondary, fontSize: 16, marginRight: 4 }} />{hotel.owner?.username}</div>
                </div>
              </div>
              <hr style={{ margin: '16px 0 12px 0', borderColor: '#eee' }} />
              <div className="d-flex justify-content-between align-items-center mt-2">
                <button className="btn" style={{ background: COLORS.tertiary, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '6px 24px' }} onClick={() => setExpandedHotel(expandedHotel === hotel.hotelId ? null : hotel.hotelId)}>
                  {expandedHotel === hotel.hotelId ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />} Details
                </button>
                <button className="btn" style={{ background: COLORS.danger, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '6px 18px' }} onClick={() => handleDelete(hotel.hotelId)} disabled={actionLoading}><FaTrash className="me-2" />Delete</button>
              </div>
              {expandedHotel === hotel.hotelId && (
                <div className="mt-3" style={{ background: '#f8f9fa', borderRadius: 12, padding: 16, border: '1.5px solid #e0e6ed' }}>
                  <div className="mb-2"><b>Description:</b> {hotel.description}</div>
                  <div className="mb-2"><b>Address:</b> {hotel.address}</div>
                  <div className="mb-2"><b>Email:</b> {hotel.email}</div>
                  <div className="mb-2"><b>Zip Code:</b> {hotel.zipCode}</div>
                  <div className="mb-2"><b>Rating:</b> {hotel.rating}</div>
                  <div className="mb-2"><b>Active:</b> {hotel.active ? 'Yes' : 'No'}</div>
                  <div className="mb-2"><b>Rooms:</b></div>
                  {hotel.rooms && hotel.rooms.length > 0 ? (
                    <ul style={{ paddingLeft: 18 }}>
                      {hotel.rooms.map(room => (
                        <li key={room.roomId} style={{ marginBottom: 6 }}>
                          <b>{room.roomType}</b> #{room.roomNumber} - ${room.pricePerNight} ({room.available ? 'Available' : 'Unavailable'})
                        </li>
                      ))}
                    </ul>
                  ) : <div className="text-muted">No rooms listed</div>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 