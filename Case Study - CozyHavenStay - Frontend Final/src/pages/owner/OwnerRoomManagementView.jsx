import React, { useState, useEffect } from "react";
import { getAllOwnerHotels, getOwnerHotelRooms, addRoomToHotel, updateRoom, deleteRoom } from "../../api/hotels";
import RoomCardLogo from "../../assets/RoomCardLogo.png";
import toast, { Toaster } from "react-hot-toast";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff"
};

export default function OwnerRoomManagementView() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [roomForm, setRoomForm] = useState({
    roomNumber: "",
    roomType: "BUDGET",
    pricePerNight: "",
    capacity: "",
    description: "",
    amenities: ""
  });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    getAllOwnerHotels().then(data => {
      setHotels(data);
      if (data.length > 0) setSelectedHotel(data[0].hotelId);
    });
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      setLoading(true);
      getOwnerHotelRooms(selectedHotel)
        .then(setRooms)
        .catch(() => setRooms([]))
        .finally(() => setLoading(false));
    }
  }, [selectedHotel]);

  // UI rendering and modal logic will be implemented next
  return (
    <div>
      <Toaster position="top-right" />
      <div className="d-flex align-items-center justify-content-between mb-4 gap-3 flex-wrap" style={{ minHeight: 56 }}>
        <h1 style={{ fontSize: 32, color: COLORS.tertiary, margin: 0, fontWeight: 800, flex: '0 0 auto' }}>Room Management</h1>
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
        <button className="btn" style={{ background: COLORS.tertiary, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '8px 20px', flex: '0 0 auto' }} onClick={() => { setShowModal(true); setModalMode('add'); setRoomForm({ roomNumber: '', roomType: 'BUDGET', pricePerNight: '', capacity: '', description: '', amenities: '' }); setFormError(null); }}>
          Add Room +
        </button>
      </div>
      {/* Room Cards Grid */}
      <div className="row g-4">
        {loading ? (
          <div className="text-center w-100 py-5">Loading rooms...</div>
        ) : rooms.length === 0 ? (
          <div className="text-center w-100 py-5 text-muted">No rooms found for this hotel.</div>
        ) : rooms.map(room => (
          <div className="col-md-6 col-lg-4" key={room.roomId}>
            <div className="card shadow-sm rounded-4 p-4 mb-4 d-flex flex-column justify-content-between" style={{ background: COLORS.primary, border: '1px solid #bfc9d9', minHeight: 260, maxWidth: 370, width: '100%', boxShadow: '0 2px 12px #0a2c4510' }}>
              <div>
                <div className="d-flex align-items-center mb-2">
                  <img src={RoomCardLogo} alt="Room" style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover', marginRight: 16, border: '1.5px solid #eee' }} />
                  <div>
                    <div className="fw-bold" style={{ fontSize: 22, color: COLORS.tertiary }}>{room.roomType} Room</div>
                    <div className="d-flex align-items-center" style={{ color: COLORS.secondary, fontWeight: 700, fontSize: 16 }}>
                      Price/night : $ {room.pricePerNight}
                    </div>
                    <div className="d-flex align-items-center" style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>
                      Capacity <span style={{ marginLeft: 4, marginRight: 2, color: COLORS.secondary, fontSize: 16 }}>&#128101;</span> {room.capacity || room.maxOccupancy || '-'}
                    </div>
                  </div>
                </div>
                <hr style={{ margin: '16px 0 12px 0', borderColor: '#eee' }} />
                <div className="mb-2" style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 16 }}>Amenities</div>
                <div className="mb-3" style={{ color: '#888', fontSize: 14 }}>{room.amenities || 'N/A'}</div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button className="btn" style={{ background: COLORS.tertiary, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '6px 24px' }} onClick={() => { setShowModal(true); setModalMode('edit'); setEditingRoomId(room.roomId); setRoomForm({ roomNumber: room.roomNumber, roomType: room.roomType, pricePerNight: room.pricePerNight, capacity: room.capacity || room.maxOccupancy || '', description: room.description, amenities: room.amenities || '' }); setFormError(null); }}>Edit <span role="img" aria-label="edit">🛠️</span></button>
                <button className="btn" style={{ background: '#dc3545', color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '6px 18px' }} onClick={async () => { if (window.confirm('Are you sure you want to delete this room?')) { setActionLoading(true); try { await deleteRoom(room.roomId); setRooms(rooms.filter(r => r.roomId !== room.roomId)); toast.success('Room deleted successfully!'); } catch (err) { alert('Failed to delete room: ' + (err.message || 'Unknown error')); } finally { setActionLoading(false); } } }} disabled={actionLoading}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for Add/Edit Room */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(10,44,69,0.15)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content" style={{ borderRadius: 18 }}>
              <div className="modal-header" style={{ borderBottom: '1px solid #eee' }}>
                <h5 className="modal-title fw-bold" style={{ color: COLORS.tertiary }}>{modalMode === 'add' ? 'Add New Room' : 'Edit Room'}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={async e => {
                e.preventDefault();
                setActionLoading(true);
                setFormError(null);
                try {
                  if (modalMode === 'add') {
                    const newRoom = await addRoomToHotel(selectedHotel, roomForm);
                    setRooms([newRoom, ...rooms]);
                    toast.success('Room created successfully!');
                  } else if (modalMode === 'edit') {
                    const updatedRoom = await updateRoom(editingRoomId, roomForm);
                    setRooms(rooms.map(r => r.roomId === editingRoomId ? updatedRoom : r));
                    toast.success('Room updated successfully!');
                  }
                  setShowModal(false);
                } catch (err) {
                  setFormError(err.message || 'Failed to save room');
                } finally {
                  setActionLoading(false);
                }
              }}>
                <div className="modal-body">
                  {formError && <div className="alert alert-danger">{formError}</div>}
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Room Number</label>
                      <input type="text" className="form-control" value={roomForm.roomNumber} onChange={e => setRoomForm(f => ({ ...f, roomNumber: e.target.value }))} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Room Type</label>
                      <select className="form-select" value={roomForm.roomType} onChange={e => setRoomForm(f => ({ ...f, roomType: e.target.value }))} required>
                        <option value="BUDGET">Budget</option>
                        <option value="DELUXE">Deluxe</option>
                        <option value="SUITE">Suite</option>
                        <option value="FAMILY">Family</option>
                        <option value="EXECUTIVE">Executive</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Price Per Night</label>
                      <input type="number" className="form-control" value={roomForm.pricePerNight} onChange={e => setRoomForm(f => ({ ...f, pricePerNight: e.target.value }))} required min="0" step="0.01" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Capacity</label>
                      <input type="number" className="form-control" value={roomForm.capacity} onChange={e => setRoomForm(f => ({ ...f, capacity: e.target.value }))} required min="1" />
                    </div>
                    <div className="col-md-8">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Description</label>
                      <input type="text" className="form-control" value={roomForm.description} onChange={e => setRoomForm(f => ({ ...f, description: e.target.value }))} required />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Amenities</label>
                      <input type="text" className="form-control" value={roomForm.amenities} onChange={e => setRoomForm(f => ({ ...f, amenities: e.target.value }))} placeholder="WiFi, TV, Ceiling Fan, Work Desk" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTop: '1px solid #eee' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={actionLoading}>Cancel</button>
                  <button type="submit" className="btn" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 8, fontSize: 16, padding: '8px 28px' }} disabled={actionLoading}>{actionLoading ? 'Saving...' : (modalMode === 'add' ? 'Add Room' : 'Save Changes')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 