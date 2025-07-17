import React, { useEffect, useState } from "react";
import { getAllOwnerHotels, deleteHotel, createHotel } from "../../api/hotels";
import { FaStar, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff",
  danger: "#dc3545"
};

const initialHotel = {
  hotelName: "",
  description: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  contactNumber: "",
  email: ""
};

export default function OwnerHotelsView() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hotelForm, setHotelForm] = useState(initialHotel);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllOwnerHotels()
      .then(setHotels)
      .catch((err) => setError(err.message || "Failed to load hotels"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    setDeleting(hotelId);
    try {
      await deleteHotel(hotelId);
      setHotels(hotels.filter(h => h.hotelId !== hotelId));
      toast.success('Hotel deleted successfully!');
    } catch (err) {
      alert("Failed to delete hotel: " + (err.message || "Unknown error"));
    } finally {
      setDeleting(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelForm(f => ({ ...f, [name]: value }));
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      const newHotel = await createHotel(hotelForm);
      setHotels([newHotel, ...hotels]);
      setShowModal(false);
      setHotelForm(initialHotel);
      toast.success('Hotel created successfully!');
    } catch (err) {
      setFormError(err.message || "Failed to create hotel");
    } finally {
      setFormLoading(false);
    }
  };

  // Filter hotels by search
  const filteredHotels = hotels.filter(hotel => {
    const q = search.toLowerCase();
    return (
      hotel.hotelName.toLowerCase().includes(q) ||
      hotel.city.toLowerCase().includes(q) ||
      hotel.state.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Toaster position="top-right" />
      <div className="d-flex align-items-center justify-content-between mb-4 gap-3 flex-wrap" style={{ minHeight: 56 }}>
        <h1 style={{ fontSize: 32, color: COLORS.tertiary, margin: 0, fontWeight: 800, flex: '0 0 auto' }}>Hotels</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, city, or state..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 340, minWidth: 200, borderRadius: 10, border: '1.5px solid #e0e6ed', boxShadow: '0 1px 4px #0a2c4508', fontSize: 17, fontWeight: 500, color: COLORS.tertiary, background: COLORS.primary, flex: 1, marginLeft: 16, marginRight: 16 }}
        />
        <button className="btn" style={{ background: COLORS.tertiary, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '8px 20px', flex: '0 0 auto' }} onClick={() => setShowModal(true)}>
          Add Hotel +
        </button>
      </div>
      {/* Modal for Add Hotel */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(10,44,69,0.15)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content" style={{ borderRadius: 18 }}>
              <div className="modal-header" style={{ borderBottom: '1px solid #eee' }}>
                <h5 className="modal-title fw-bold" style={{ color: COLORS.tertiary }}>Add New Hotel</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleAddHotel}>
                <div className="modal-body">
                  {formError && <div className="alert alert-danger">{formError}</div>}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Hotel Name</label>
                      <input className="form-control" name="hotelName" value={hotelForm.hotelName} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Contact Email</label>
                      <input className="form-control" name="email" type="email" value={hotelForm.email} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label fw-semibold">Description</label>
                      <input className="form-control" name="description" value={hotelForm.description} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Address</label>
                      <input className="form-control" name="address" value={hotelForm.address} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">City</label>
                      <input className="form-control" name="city" value={hotelForm.city} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">State</label>
                      <input className="form-control" name="state" value={hotelForm.state} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Country</label>
                      <input className="form-control" name="country" value={hotelForm.country} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Zip Code</label>
                      <input className="form-control" name="zipCode" value={hotelForm.zipCode} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Contact Number</label>
                      <input className="form-control" name="contactNumber" value={hotelForm.contactNumber} onChange={handleInputChange} required />
                    </div>
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTop: '1px solid #eee' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={formLoading}>Cancel</button>
                  <button type="submit" className="btn" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 8, fontSize: 16, minWidth: 120 }} disabled={formLoading}>
                    {formLoading ? 'Saving...' : 'Create Hotel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {loading && <div className="text-center my-5"><div className="spinner-border" style={{ color: COLORS.secondary }} role="status"><span className="visually-hidden">Loading...</span></div></div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="row g-4">
        {filteredHotels.map((hotel) => (
          <div className="col-md-6 col-lg-4" key={hotel.hotelId}>
            <div className="card shadow-sm rounded-4 p-4 mb-4 d-flex flex-column justify-content-between" style={{ background: COLORS.primary, border: '1px solid #bfc9d9', minHeight: 320, maxWidth: 370, width: '100%', boxShadow: '0 2px 12px #0a2c4510' }}>
              <div>
                <div className="d-flex align-items-center mb-2">
                  <img src={require('../../assets/HotelcardLogo.png')} alt="Hotel" style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', marginRight: 16, border: '1.5px solid #eee' }} />
                  <div>
                    <div className="fw-bold" style={{ fontSize: 22, color: COLORS.tertiary }}>{hotel.hotelName}</div>
                    <div className="d-flex align-items-center" style={{ color: COLORS.secondary, fontWeight: 700, fontSize: 16 }}>
                      {hotel.rating?.toFixed(1) || 0.0} <span style={{ marginLeft: 4, marginRight: 2, color: COLORS.secondary, fontSize: 16 }}>&#9733;</span>
                      <span style={{ color: '#888', fontWeight: 500, fontSize: 15, marginLeft: 10 }}>{hotel.city}, {hotel.state}</span>
                    </div>
                  </div>
                </div>
                <hr style={{ margin: '16px 0 12px 0', borderColor: '#eee' }} />
                <div className="mb-2" style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 16 }}>{hotel.description}</div>
                <div className="mb-3" style={{ color: '#888', fontSize: 14 }}>Contact: {hotel.contactNumber}</div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button className="btn" style={{ background: COLORS.tertiary, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '6px 24px' }}>Edit <span role="img" aria-label="edit">🛠️</span></button>
                <button className="btn" style={{ background: COLORS.danger, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '6px 18px' }} onClick={() => handleDelete(hotel.hotelId)} disabled={deleting === hotel.hotelId}>
                  {deleting === hotel.hotelId ? 'Deleting...' : <><span style={{ marginRight: 6 }}>&#128465;</span>Delete</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
} 