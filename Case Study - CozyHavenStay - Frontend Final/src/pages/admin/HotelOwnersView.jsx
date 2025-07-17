import React, { useEffect, useState } from "react";
import { getAllHotelOwners, createHotelOwner, updateHotelOwner, deleteHotelOwner } from "../../api/admin";
import toast, { Toaster } from "react-hot-toast";
import { FaUserTie, FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff",
  danger: "#dc3545"
};

const initialOwner = {
  username: "",
  password: "",
  email: "",
  phoneNumber: ""
};

export default function HotelOwnersView() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [ownerForm, setOwnerForm] = useState(initialOwner);
  const [editingOwnerId, setEditingOwnerId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = () => {
    setLoading(true);
    getAllHotelOwners()
      .then(setOwners)
      .catch((err) => setError(err.message || "Failed to load hotel owners"))
      .finally(() => setLoading(false));
  };

  const handleAdd = () => {
    setShowModal(true);
    setModalMode("add");
    setOwnerForm(initialOwner);
    setFormError(null);
  };

  const handleEdit = (owner) => {
    setShowModal(true);
    setModalMode("edit");
    setEditingOwnerId(owner.userId);
    setOwnerForm({
      username: owner.username,
      password: "",
      email: owner.email,
      phoneNumber: owner.phoneNumber
    });
    setFormError(null);
  };

  const handleDelete = async (ownerId) => {
    if (!window.confirm("Are you sure you want to delete this hotel owner?")) return;
    setActionLoading(true);
    try {
      await deleteHotelOwner(ownerId);
      setOwners(owners.filter(o => o.userId !== ownerId));
      toast.success("Hotel owner deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete hotel owner: " + (err.message || "Unknown error"));
    } finally {
      setActionLoading(false);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setFormError(null);
    try {
      if (modalMode === "add") {
        await createHotelOwner(ownerForm);
        toast.success("Hotel owner created successfully!");
      } else if (modalMode === "edit") {
        await updateHotelOwner(editingOwnerId, { ...ownerForm, role: "HOTEL_OWNER" });
        toast.success("Hotel owner updated successfully!");
      }
      setShowModal(false);
      fetchOwners();
    } catch (err) {
      setFormError(err.message || "Failed to save hotel owner");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="d-flex align-items-center justify-content-between mb-4 gap-3 flex-wrap" style={{ minHeight: 56 }}>
        <h1 style={{ fontSize: 32, color: COLORS.tertiary, margin: 0, fontWeight: 800, flex: '0 0 auto' }}>Hotel Owners</h1>
        <button className="btn" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '8px 20px', flex: '0 0 auto' }} onClick={handleAdd}>
          <FaPlus className="me-2" /> Add Owner
        </button>
      </div>
      <div className="row g-4">
        {loading ? (
          <div className="text-center w-100 py-5">Loading hotel owners...</div>
        ) : error ? (
          <div className="alert alert-danger w-100 text-center">{error}</div>
        ) : owners.length === 0 ? (
          <div className="text-center w-100 py-5 text-muted">No hotel owners found.</div>
        ) : owners.map(owner => (
          <div className="col-md-6 col-lg-4" key={owner.userId}>
            <div className="card shadow-sm rounded-4 p-4 mb-4 d-flex flex-column justify-content-between" style={{ background: COLORS.primary, border: '1px solid #bfc9d9', minHeight: 180, maxWidth: 370, width: '100%', boxShadow: '0 2px 12px #0a2c4510' }}>
              <div className="d-flex align-items-center mb-2">
                <FaUserTie style={{ fontSize: 36, color: COLORS.secondary, marginRight: 16 }} />
                <div>
                  <div className="fw-bold" style={{ fontSize: 22, color: COLORS.tertiary }}>{owner.username}</div>
                  <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>{owner.email}</div>
                  <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>Phone: {owner.phoneNumber}</div>
                </div>
              </div>
              <hr style={{ margin: '16px 0 12px 0', borderColor: '#eee' }} />
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button className="btn" style={{ background: COLORS.tertiary, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '6px 24px' }} onClick={() => handleEdit(owner)}><FaEdit className="me-2" />Edit</button>
                <button className="btn" style={{ background: COLORS.danger, color: COLORS.primary, fontWeight: 600, borderRadius: 8, fontSize: 16, padding: '6px 18px' }} onClick={() => handleDelete(owner.userId)} disabled={actionLoading}><FaTrash className="me-2" />Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for Add/Edit Owner */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(10,44,69,0.15)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content" style={{ borderRadius: 18 }}>
              <div className="modal-header" style={{ borderBottom: '1px solid #eee' }}>
                <h5 className="modal-title fw-bold" style={{ color: COLORS.tertiary }}>{modalMode === 'add' ? 'Add New Hotel Owner' : 'Edit Hotel Owner'}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleModalSubmit}>
                <div className="modal-body">
                  {formError && <div className="alert alert-danger">{formError}</div>}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Username</label>
                      <input type="text" className="form-control" value={ownerForm.username} onChange={e => setOwnerForm(f => ({ ...f, username: e.target.value }))} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Email</label>
                      <input type="email" className="form-control" value={ownerForm.email} onChange={e => setOwnerForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Phone Number</label>
                      <input type="text" className="form-control" value={ownerForm.phoneNumber} onChange={e => setOwnerForm(f => ({ ...f, phoneNumber: e.target.value }))} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Password</label>
                      <input type="password" className="form-control" value={ownerForm.password} onChange={e => setOwnerForm(f => ({ ...f, password: e.target.value }))} required={modalMode === 'add'} placeholder={modalMode === 'edit' ? '(Leave blank to keep unchanged)' : ''} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTop: '1px solid #eee' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={actionLoading}>Cancel</button>
                  <button type="submit" className="btn" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 8, fontSize: 16, padding: '8px 28px' }} disabled={actionLoading}>{actionLoading ? 'Saving...' : (modalMode === 'add' ? 'Add Owner' : 'Save Changes')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 